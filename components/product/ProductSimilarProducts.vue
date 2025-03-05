<template>
  <section class="product-page__similar" v-if="pending || (data && Object.keys(data).length)">
    <h2 class="t-h--3">Similar products</h2>
    <div class="relative">
      <div class="carousel relative">
        <div class="carousel__arrows d-flex absolute" v-if="data?.length > slidesPerPage || (!data?.isArray && Object.keys(data).length > slidesPerPage)">
          <button class="carousel__prev btn btn--black" disabled ref="prev">
            <nuxt-icon name="ui/arrow" />
          </button>
          <button class="carousel__next btn btn--black" ref="next">
            <nuxt-icon name="ui/arrow" />
          </button>
        </div>

        <Swiper :modules="[SwiperNavigation]"
                :navigation="navigation"
                :slides-per-view="slidesPerPage || 6"
                :slides-per-group="slidesPerPage || 6"
                :space-between="12"
                :speed="1000"
                @swiper="swiperInited = true"
                v-show="swiperInited"
        >
          <SwiperSlide v-for="product in data" :key="product.id">
            <ProductsItem :product="product" />
          </SwiperSlide>
        </Swiper>

      </div>

      <ProductsGrid :items-per-row="slidesPerPage" :items-per-page="slidesPerPage" v-show="!swiperInited" />
    </div>
  </section>
</template>

<script setup>
import {getApiUrl} from "~/composables/globalState";
import {useProductInfo} from "~/composables/catalogState";

const headers = useRequestHeaders(['cookie'])
const PRODUCT_INFO = useProductInfo()
const API_URL = getApiUrl()

const swiperInited = ref(false)
const prev = ref(null)
const next = ref(null)
let slidesPerPage = ref(6)
const navigation = reactive({
  nextEl: next,
  prevEl: prev
})

// Сколько продуктов в ряд
let onWidthChange = () => {
  if (window.innerWidth < 767) {
    slidesPerPage.value = 2
  } else if (window.innerWidth < 1199) {
    slidesPerPage.value = 4
  } else {
    slidesPerPage.value = 6
  }
}

const getSimilarProducts = async () => {
  try {
    const formData = new FormData();
    formData.append('limit', 12);
    formData.append('productId', PRODUCT_INFO.value.id);
    const url = `${API_URL}/get-products/friendly`
    const response = await $fetch(url, { method: 'post', body: formData, headers: headers });
    return response.products
  } catch (e) {
    console.log('catalog products error',e)
    showError({statusCode: e.status, statusMessage: e.message})
  }
}

const { data, pending  } = await useLazyAsyncData('similarProducts', getSimilarProducts, {
  watch: [PRODUCT_INFO]
})

onMounted(() => {
  if (process.client && globalThis?.window) {
      onWidthChange()
      window?.addEventListener('resize', onWidthChange)
  }
})

onUnmounted(() => {
  if (process.client && globalThis?.window) {
    window?.removeEventListener("resize", onWidthChange)
  }
})
</script>

<style lang="stylus">
.product-page__similar
  h2
    max-width calc(100% - 95px)
    margin-top 32px
    margin-bottom 32px

.carousel
  .mobile-slides
    overflow-x scroll
    overflow-y hidden
    .swiper-slide
      max-width fit-content
  .swiper
    padding 0 8px
    margin 0 -8px
  &__arrows
    top -56px
    right 0
    gap 8px
    @media (max-width: 1199px)
      top -37px
    .btn
      width 40px
      padding 18px
      transition opacity .3s

  &__prev
    transform rotate(180deg)
</style>