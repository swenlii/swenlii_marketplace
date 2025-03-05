<template>
  <div class="home-products"
       v-if="(data && Object.keys(data).length) || pending"
       :class="{'home-products--bordered' : border}">
    <div class="home-section__head d-flex justify-between" v-if="title">
      <NuxtLink :to="link">
        <h2 class="t-h--1" v-html="title"></h2>
      </NuxtLink>
      <NuxtLink :to="link" class="home-section__link d-flex align-center t-ui--m">
        See more
        <nuxt-icon name="ui/arrow"/>
      </NuxtLink>
    </div>
    <ProductsGrid :products="data" :items-per-row="6" :items-per-page="6"
                  :pending="pending" :horizontal="true" />
  </div>
</template>

<script setup>
  import {objToFormData} from "~/utils/objToFormData";
  import {getApiUrl} from "~/composables/globalState";

  const props = defineProps(['apiUrl','title','link','limit','id','idVar','index','border', 'sort'])
  const API_URL = getApiUrl()

  const payLoad = computed(() => {
    let obj = {
      limit: props.limit || 6,
      sort: props.sort || 4,
      lang: 'en'
    }
    if (props.id && props.idVar) {
      obj[props.idVar] = props.id
    }
    return objToFormData(obj)
  })

  const headers = useRequestHeaders(['cookie'])

  const getProducts = () => $fetch(`${API_URL}${props.apiUrl}`, {
    method: 'post',
    body: payLoad.value,
    headers: headers
  }).then((response) => {
    return response.products
  }).catch( async (e) => {
    console.log(e)
  })

  const key = ref('homeProducts' + props.index)
  const { data, pending  } = await useLazyAsyncData(key.value, getProducts, {
    server: !props.lazy,
    watch: [payLoad]
  })

</script>

<style lang="stylus">
  .home-products
    &--bordered
      padding 40px 0
      border-bottom 1px solid #DADADC
      border-top 1px solid #DADADC
    h2
      display flex
      align-items center
      letter-spacing 1px
      gap 8px
      @media (max-width: 1199px)
        gap 6px
      svg
      img
        display block
        @media (max-width: 1199px)
          width 20px
          height auto
</style>