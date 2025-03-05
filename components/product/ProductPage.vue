<template>
  <div class="product-page">
    <BreadCrumbs />

    <!-- Верхний контент -->
    <div class="product-page__top">
      <div class="product-page__left">
        <ProductGallery v-if="!pending" />
        <ProductGallerySkeleton v-else />
      </div>

      <div class="product-page__right">
        <ProductHead :pending="pending" />
        <ProductDescription :pending="pending" />
        <ProductPanel :pending="pending"/>
      </div>
    </div>

    <!-- Нижний контент -->
    <div class="product-page__content" v-show="!pending">

      <section class="product-page__section">
        <ProductSeller :pending="pending" />
      </section>

      <section class="product-page__section">
        <ProductCharacteristics v-if="PRODUCT_INFO?.characteristics.length"
                              :pending="pending || !PRODUCT_INFO?.title" />
      </section>

      <ProductSimilarProducts v-if="PRODUCT_INFO?.id"/>

      <section class="product-page__section" v-if="BREADCRUMBS?.length > 1 && BREADCRUMBS[1].title">
        <MetaCategoryGrid :grid="[2, 3]" :id="BREADCRUMBS[1].title" />
      </section>
    </div>

  </div>
</template>

<script setup>
import { useProductInfo, useBreadCrumbs } from "~/composables/catalogState";
import { prepareBreadcrumbs } from "~/utils/prepareBreadcrumbs";
import {getApiUrl} from "~/composables/globalState";
import {objToFormData} from "~/utils/objToFormData";

const PRODUCT_INFO = useProductInfo()
const BREADCRUMBS = useBreadCrumbs()
const productID = ref(null)

const route = useRoute()
const API_URL = getApiUrl()

const headers = useRequestHeaders(['cookie'])

// Разбивка характеристик на группы
const prepareCharacteristics = (arr) => {
    if (!arr) return
    let characteristics = []
    let detailed = []
    let title = ''
    let tmp = []
    if (arr[0] && arr[0].length) {
        for (let item of arr[0]) {
            if (item.type === '0') {
                if (tmp.length) {
                    characteristics.push({
                        title: title,
                        items: tmp
                    })
                    tmp = []
                }
                title = item.title
            } else {
                if (item.value.length < 50 && item.value !== 'null') tmp.push(item)
                else if (item.value !== 'null') detailed.push(item)
            }
        }
    }
    if (tmp.length) characteristics.push({
        title: title,
        items: tmp
    })
    if (detailed.length) {
        characteristics.unshift({title: '', items: detailed})
    }

    return characteristics
}

const getProductInfo = async () => {
  try {
    const url = `${API_URL}/product/${route.params.product_url}`
    const response = await $fetch(url,
        {
          method: 'post',
          headers: headers,
          body: objToFormData({lang: 'en'})
        }
    )


    response.characteristics = prepareCharacteristics(response.characteristics)
    PRODUCT_INFO.value = response

    BREADCRUMBS.value = prepareBreadcrumbs(response.breadCrumbs)

    if (PRODUCT_INFO.value.characteristics.length) {
      if (PRODUCT_INFO.value.characteristics[0].title.length) {
        PRODUCT_INFO.value.characteristics[0].items.unshift({title: "Article number", value: PRODUCT_INFO.value.vendor_code})
      } else {
        PRODUCT_INFO.value.characteristics[1].items.unshift({title: "Article number", value: PRODUCT_INFO.value.vendor_code})
      }
    }

    BREADCRUMBS.value = prepareBreadcrumbs(response.breadCrumbs)
    productID.value = response.id
    if (!process.server) {
      setSeo()
    }
    return response
  } catch (e) {
    console.log('product info error',e)
    showError({statusCode: e.status, statusMessage: e.message})
  }
}

const {pending, error} = await useLazyAsyncData('productInfo', getProductInfo)

const setSeo = () => {
  let title = `Product № ${PRODUCT_INFO.value.id} | ${PRODUCT_INFO.value.title} | Marketplace`
  useSeoMeta({
    title: title,
    ogTitle: title,
    twitterTitle: title,
    description: title,
    ogDescription: title,
    twitterDescription: title
  })
}

if (process.server) setSeo()

onUnmounted(() => {
  PRODUCT_INFO.value = null
})

onBeforeRouteUpdate(() => {
  PRODUCT_INFO.value = null
})

</script>

<style lang="stylus">
.product-page
  h2
    font-size 24px
    letter-spacing 0
  &__top
    display flex
    flex-direction row-reverse
    gap 30px
    align-items flex-start
    @media (max-width: 1199px)
      display block
  &__right
    flex 1
  &__section
    margin-top 32px
    &:first-child
      margin-top 0
  .category-grid
    gap 4px
    &__row
      gap 4px
    &__item
      padding 12px
    &__title
      font-size 18px
    &__more svg
      width 14px !important
      height 14px !important
</style>
