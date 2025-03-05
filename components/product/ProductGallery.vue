<template>
  <section class="product-gallery d-flex relative" aria-label="Gallery"
           :class="{'product-gallery--single' : GALLERY?.value?.length === 1}">
    <div class="product-gallery__main-image relative">

      <div class="product-gallery__discount t-ui--s"
           v-if="+PRODUCT_INFO?.discount" aria-hidden="true">
        -{{ PRODUCT_INFO?.discount }}%
      </div>

      <div class="product-gallery__nav product-gallery__nav--prev absolute gallery-prev-nav hidden-mobile" v-if="GALLERY?.value?.length > 1">
        <button><nuxt-icon name="ui/breadcrumbs"/></button>
      </div>
      <div class="product-gallery__nav product-gallery__nav--next absolute gallery-next-nav hidden-mobile" v-if="GALLERY?.value?.length > 1">
        <button><nuxt-icon name="ui/breadcrumbs"/></button>
      </div>

      <Swiper :modules="[SwiperFreeMode, SwiperNavigation, SwiperThumbs, SwiperPagination, SwiperZoom]"
              :navigation="navigation" :loop="true" :thumbs="{ swiper: thumbsSwiper }"
              :initial-slide="modalState?.productGallery !== true ? +modalState?.productGallery : 0"
              :pagination="{enabled: !isModal}"
              :zoom="isModal ? {toggle: false, maxRatio: 2.5} : false"
      >
        <SwiperSlide v-for="(src, index) in GALLERY.value" :key="src" @click="!isModal ? openModal(index) : ''">
          <div class="swiper-zoom-container">
            <img :src="src" :alt="PRODUCT_INFO?.title + ' - ' + (index + 1)"/>
          </div>
        </SwiperSlide>
      </Swiper>

    </div>

    <div class="product-gallery__thumbs-wrap" v-if="GALLERY?.value?.length > 1 && isModal">
      <div class="product-gallery__thumbs">
        <Swiper :modules="[SwiperNavigation, SwiperGrid, SwiperThumbs, SwiperFreeMode]" @swiper="setSwiper"
                :direction="thumbsDirection" :slidesPerView="thumbsNum"
                :initial-slide="modalState?.productGallery !== true ? +modalState?.productGallery : 0"
                :free-mode="isModal"
        >
          <SwiperSlide v-for="(src, index) in GALLERY.value" :key="src">
            <div class="product-gallery__thumb d-flex justify-center">
              <img :src="src" :alt="PRODUCT_INFO?.title + ' - ' + (index + 1) + ' miniature'"/>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

  </section>
</template>

<script setup>
import {setModalState, useModalState} from "~/composables/globalState";
import {useProductInfo} from "~/composables/catalogState";

const modalState = useModalState()

const props = defineProps({
  isModal: {
    type: Boolean,
    default: false
  }
})

const GALLERY = reactive([])
const PRODUCT_INFO = useProductInfo()
const thumbsSwiper = ref(null)
const thumbsDirection = ref('vertical')
const thumbsNum = ref(null)

const openModal = (index) => {
  setModalState('productGallery', index ? index : true)
}

const initGallery = () => {
  if (PRODUCT_INFO.value?.images_s3_url.length) {
    GALLERY.value = PRODUCT_INFO.value?.images_s3_url.filter(imageLink => imageLink?.length)
  }
}
initGallery()

const navigation = reactive({
  enabled: true,
  nextEl: '.gallery-next-nav',
  prevEl: '.gallery-prev-nav',
})

const setSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const handleResize = async () => {
  if (window.innerWidth < 1200) {
    thumbsNum.value = Math.floor((window.innerWidth - 24) / 52)
    thumbsDirection.value = 'horizontal'
  } else {
    thumbsNum.value = props.isModal ? Math.floor((window.innerHeight - 56) / 60) : 6
    thumbsDirection.value = 'vertical'
  }
}

onMounted(() => {
  if (process.client && globalThis?.window) {
    handleResize()
    window.addEventListener("resize", handleResize);
  }
})

onUnmounted(() => {
  if (process.client && globalThis?.window) {
    window?.removeEventListener("resize", handleResize)
  }
  
})
</script>

<style lang="stylus">
.product-gallery
  gap 8px
  flex-direction row-reverse
  &__discount
    position absolute
    top 16px
    left 16px
    gap 4px
    z-index 2
    display flex
    color #fff
    padding 4px 8px
    border-radius 4px
    align-items center
    background #333
    font-weight 800
  &--single
    flex-direction row
  @media (max-width: 768px)
    width 100vw
    height 100vw
    margin-left -16px
    margin-bottom 16px
  @media (min-width: 768px) and (max-width: 1199px)
    flex-direction column
  .swiper-slide-thumb-active .product-gallery__thumb
    border 1px solid var(--accent)
  .swiper
    overflow hidden
    width 100%
    height 100%
    @media (max-width: 768px)
      overflow: visible
      &-wrap
        overflow: hidden
    &-pagination
      bottom 0
      border-radius 0 0 4px 4px
      background-color rgba(255,255,255,0.3)
      &-bullet
        background black
        opacity 0.3
        &-active
          background black
          opacity 1
      @media (max-width: 768px)
        display flex
        height 4px
        gap 2px
        bottom -6px
        padding 0 2px
        &-bullet
          flex 1
          height 4px !important
          margin 0 !important
          background #DADADC
          border-radius 0
          opacity 1
          &-active
            background linear-gradient(270deg, #282828 0.64%, rgba(40, 40, 40, 0.60) 100%)
  &__nav
    z-index 10
    position absolute
    top calc(50% - 15px)
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow hidden
    button
      z-index 10
      width: 40px;
      height: 40px;
      border-radius: 4px;
      color: #fff;
      background: #333;
      display flex
      justify-content center
      align-items center
    svg
      width 15px !important
      height 15px !important
    &--next
      right 0
    &--prev
      svg
        transform rotate(180deg)
  &__thumbs-wrap
    width 52px
    flex-shrink 0
    @media (max-width: 768px)
      display none
  &__main-image
    width 575px
    height 575px
    cursor zoom-in
    @media (max-width: 768px)
      width 100vw
      height 100vw
    @media (min-width: 768px) and (max-width: 1199px)
      width 100%
      height 100%
    .swiper-slide
      width 100%
      height 100%
      border-radius 4px
      overflow hidden
      background white
      @media (max-width: 768px)
        border-radius 0
      > div
        height 100%
    picture
    img
      width 100%
      height 100%
      object-fit contain
      display block
      // чтобы картинка не съезжала на 768px когда 1 столбец (ipad Mini например)
      @media (max-width: 768px)
        max-height 768px
      // более 768px верстка становится в 2 столбца и нужно ограничение на таких планшетах
      @media (min-width: 769px) and (max-width: 1199px)
        max-height 535px
  &__thumbs
    height 325px
    @media (min-width: 768px) and (max-width: 1199px)
      height 58px !important
      width 510px
  &__thumb
    width 52px
    height 52px
    background var(--bg-gray)
    border-radius 4px
    overflow hidden
    cursor pointer
    img
      width 100%
      height 100%
      object-fit contain
      display block
      filter brightness(.97)
  &__next, &__prev
    width 100%
    cursor pointer
    margin-top 8px
    background #333
    color white
    border-radius 4px
    padding 4px
    .nuxt-icon
      width 15px
      height 15px
      display block
      transform rotate(90deg)
      svg
        width 15px !important
        height 15px !important
    @media (min-width: 768px) and (max-width: 1199px)
      transform rotate(-90deg)
      right -20px
      position absolute
      bottom 20px
      width 52px
  &__prev
    margin-bottom 8px
    .nuxt-icon
      transform rotate(-90deg)
</style>