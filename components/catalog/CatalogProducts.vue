<template>
  <section class="catalog-products" id="catalog-products">
    <div class="empty-catalog d-flex justify-between align-center" v-if="emptyCatalog">
      <div class="empty-catalog__text">
        <h2>Here is empty</h2>
        <p>There are no products added to this category yet</p>
      </div>
      <NuxtLink :to="'/catalog'" class="btn btn--primary">Go to catalog</NuxtLink>
    </div>
    <ProductsGrid v-else :products="products" :items-per-row="4" :items-per-page="48"
                  :pending="pending && !loadMore"/>
    <Pagination v-if="count"
                :total-pages="Math.ceil(count / limit)"
                :loading="(pending && loadMore)"
                :infinite="!sellerId"/>
  </section>
</template>

<script setup>
import {objToFormData} from "~/utils/objToFormData";
import {useCatalogProducts, useCatalogCount} from "~/composables/catalogState";
import {getApiUrl} from "~/composables/globalState";

const props = defineProps(['apiUrl','categoryId', 'sellerId'])
const route = useRoute()
const emit = defineEmits(['setSeo'])

const API_URL = getApiUrl()
const headers = useRequestHeaders(['cookie'])
const products = useCatalogProducts()
const count = useCatalogCount()

const loadMore = ref(false)
const limit = ref(48)

const payLoad = computed(() => {
  let data = {
    sort: 4,
    page: route?.query?.page ? route.query.page - 1 : 0,
    limit: limit.value,
    category_id: props.categoryId,
    categoryId: props.categoryId,
    class_id: props.categoryId,
  }

  if (props.sellerId) data['provider_id'] = props.sellerId

  return objToFormData(data)
})

const getProducts = async () => {
  try {
    const url = `${API_URL}${props.apiUrl}`
    const response = await $fetch(url,{
      method: 'post',
      headers: headers,
      body: payLoad.value
    })
    products.value = loadMore.value ? {...products.value, ...response.products} : response.products
    count.value = response.count
    if (!process.server) emit('setSeo')
    return response
  } catch (e) {
    console.log('catalog products error',e)
    showError({statusCode: e.status, statusMessage: e.message})
  }
}

const {pending, error} = await useLazyAsyncData('catalogProducts', getProducts, {
  watch: [payLoad]
})

const { $listen } = useNuxtApp()
$listen('loadMore', (status) => {
  loadMore.value = status
})

// Обычный ref сбрасывается после ssr и после mounted
// Вычисляемое свойство на этих точках вычисляется и поэтому более точное
let emptyCatalog = computed(() => {
  if (pending.value === true) return false
  // Объект еще не инициализирован
  if (!products.value) return false
  return count.value <= 0
})

onMounted(() => {

})
</script>

<style lang="stylus">
.empty-catalog
  margin-top 24px
  @media (max-width: 767px)
    flex-direction column
    align-items center
    gap 24px
    border-radius 0 !important
    margin-left -16px
    width calc(100% + 32px)
    &__text
      text-align center
</style>
