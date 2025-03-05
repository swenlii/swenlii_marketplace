<template>
  <div class="catalog">
    <slot name="header"/>
    <CatalogHead :pending="pending" :title="props.title" :class="{'catalog-head__center': sidebarDisabled || !catalogInfo?.treeMenu?.length}"/>
    <div class="catalog__wrap d-flex"
         :class="{'catalog__wrap-center': sidebarDisabled || !catalogInfo?.treeMenu?.length}"
         v-show="!catalogInfo?.activeTab">

      <!-- ПРАВАЯ -->
      <div class="catalog__content">
        <!-- Для селлера -->
        <slot name="content-top" v-if="!pending" />
        <!-- Маски -->
        <ProductsGrid :items-per-row="4" :items-per-page="48" v-if="pending" />
        <!-- Продукты -->
        <CatalogProducts v-else :api-url="productsApiUrl" @setSeo="setSeo()"
        :category-id="catalogInfo?.category_id || catalogInfo?.class_id || catalogInfo?.id"
        :seller-id="catalogInfo?.seller?.seller_id" />
        <!-- Для селлера -->
        <slot name="content-bottom" v-if="!pending" />
      </div>

      <!-- ЛЕВАЯ -->
      <div class="catalog__sidebar" v-if="!sidebarDisabled && catalogInfo?.treeMenu?.length">
        <!-- Маски -->
        <div class="catalog__sidebar-skeleton flex-column" v-if="pending">
          <div class="mask" v-for="i in 25" :key="i"></div>
        </div>
        <!-- Подкаталог -->
        <CatalogNav :catalog="catalogInfo.treeMenu"
                    :max-level="+catalogInfo?.parentId ? 1 : 2"
                    :spoiler="6"
                    v-else-if="catalogInfo?.treeMenu?.length"/>
      </div>

    </div>
  </div>
</template>

<script setup>
  import {getApiUrl} from "~/composables/globalState";
  import {useBreadCrumbs, useCatalogInfo} from "~/composables/catalogState";
  import {prepareBreadcrumbs} from "~/utils/prepareBreadcrumbs";
  import {prepareCatalog} from "~/utils/prepareCatalog";
  import {objToFormData} from "~/utils/objToFormData";

  const props = defineProps(['infoApiUrl','productsApiUrl','title', 'unusualSeo', 'sidebarDisabled'])
  const route = useRoute()
  const emit = defineEmits(['setSeo'])

  const API_URL = getApiUrl()
  const headers = useRequestHeaders(['cookie'])
  const catalogInfo = useCatalogInfo()
  const breadcrumbs = useBreadCrumbs()

  const getCatalogInfo = async () => {
    try {
      const url = `${API_URL}${props.infoApiUrl}`

      const payload = {
        method: 'post',
        headers: headers,
        body: objToFormData({lang: 'en'})
      }

      const response = await $fetch(url, payload)

      if (!response.breadCrumbs) response.breadCrumbs = []
      if (!response.treeMenu) response.treeMenu = []
      
      if (response.seller) {
        response.treeMenu = prepareCatalog(response.treeMenu, `/seller/${route.params.seller_url}/`)
        response.title = response.class_title || ''
      } else {
        response.treeMenu = prepareCatalog([response.treeMenu])[0].children
      }

      catalogInfo.value = response

      breadcrumbs.value = prepareBreadcrumbs(response.breadCrumbs, !!response?.seller)
      
      if (props.title) {
        catalogInfo.value.title = props.title
      }

      if (!process.server) setSeo()
      return response
    } catch (e) {
      console.log('catalog info error',e)
      alert('error: ' + e.message)
      showError({statusCode: e.status, statusMessage: e.message})
    }
  }

  const { pending, error } = await useLazyAsyncData('catalogInfo', getCatalogInfo)

  const setSeo = () => {
    let title = catalogInfo.value.title || catalogInfo.value.seller?.seller_title || props.title
    let page = route?.query?.page ? route?.query?.page : 1

    // Для селлера
    if (props.unusualSeo) {
      emit('setSeo')
      return
    }

    let meta_title

    if (route?.query?.page) {
      meta_title = `${title} - ${page} page | Marketplace`
    } else {
      meta_title = `${title} | Marketplace`
    }

    useSeoMeta({
      title: meta_title,
      ogTitle: meta_title,
      twitterTitle: meta_title,
      description: meta_title,
      ogDescription: meta_title,
      twitterDescription: meta_title
    })
    
  }

  if (process.server) setSeo()

</script>

<style lang="stylus">
.catalog
  @media (max-width: 1199px)
    padding-bottom 30px
  &__wrap
    flex-direction row-reverse
    gap 34px
    &-center
      justify-content center
      .catalog-head h1
        text-align center
        margin-bottom 64px
        font-size 48px
  &__content
    width 916px
    @media (max-width: 1199px)
      width 100%
  &__sidebar
    width 200px
    @media (max-width: 1199px)
      display none
    &-skeleton
      gap 16px
      .mask
        width 70%
        height 18px
        margin-left 10px
        &:first-child
        &:nth-child(3n+3)
          width 100%
          margin 0

.empty-catalog
  background var(--bg-gray)
  padding 32px
  border-radius 4px

  &__text
    h2
      margin 0 0 16px

    p
      margin 0
</style>