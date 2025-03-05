<template>
  <main>
    <div class="container profile">
      <aside class="profile__sidebar">
        <ProfileSidebar/>
      </aside>

      <section class="profile__content">

        <div class="catalog-head" v-if="!pending">
          <BreadCrumbs />
        </div>

        <div class="catalog-head" v-if="!pending">
          <h1 class="t-h--1">
            Favorites products
          </h1>
        </div>

        <div class="catalog-head__skeleton" v-else>
          <div class="mask"></div>
          <div class="mask"></div>
        </div>

        <div>
          <!-- Список продуктов -->
          <ProductsGrid :items-per-row="4" :items-per-page="16" v-if="pending && !products" />
          <section class="catalog-products" v-else-if="products">
            <ProductsGrid :products="products" :items-per-row="4" :items-per-page="48"
                          :pending="pending && !loadMore"/>
            <Pagination v-if="count"
                        :total-pages="Math.ceil(count / limit)"
                        :loading="pending && loadMore"
            />
          </section>
          <!-- Список избранного пуст  -->
          <div class="empty-catalog d-flex justify-between align-center" v-else>
            <div class="empty-catalog__text">
              <h2>Here is empty...</h2>
              <p>The "Add to Favorites" button is located on any product page</p>
            </div>
            <NuxtLink :to="'/'" class="btn btn--primary">Return</NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
  import {useCatalogProducts, useBreadCrumbs} from "~/composables/catalogState";
  import {getFavorites} from "~/utils/getFavorites";

  const props = defineProps(['empty_products'])
  const route = useRoute()

  const products = useCatalogProducts()
  const breadcrumbs = useBreadCrumbs()

  const loadMore = ref(false)
  const limit = ref(16)
  const pending = ref(true)
  const count = ref(0)

  breadcrumbs.value = [{"langTitle":"Home","url":"/"}]

  const getProducts = () => {
    pending.value = true
    setTimeout(() => pending.value = false, 400)
    let page = route?.query?.page ?? 1
    let start = page * limit.value - limit.value
    let end = page * limit.value
    let prodFav = getFavorites().products
    let response = Object.fromEntries(Object.entries(prodFav).slice(start, end))
    count.value = getFavorites().count

    products.value = loadMore.value ? {...products.value, ...response} : response
  }

  watch(() => route?.query?.page, getProducts, { deep: true, immediate: true })

  // Слушаем, когда нажали на Load More
  const { $listen } = useNuxtApp()
  $listen('loadMore', (status) => {
    loadMore.value = status
  })

  const setSeo = () => {
    let meta_title = route?.query?.page ? `Favorites - page ${route?.query?.page} | Marketplace` : 'Favorites | Marketplace'

    useSeoMeta({
      title: meta_title,
      ogTitle: meta_title,
      twitterTitle: meta_title,
      description: meta_title,
      ogDescription: meta_title,
      twitterDescription: meta_title
    })
  }

  onMounted(() => {
    setSeo()
    getProducts()
  })

</script>

<style lang="stylus">
.profile
  .catalog-head
    @media (min-width: 1200px)
      h1
        margin-top 0
      &__skeleton
        .mask
          &:first-child
            display none
          &:nth-child(2)
            margin-top 0


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