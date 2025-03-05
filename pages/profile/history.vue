<template>
  <main>
    <div class="container profile">
      <aside class="profile__sidebar">
        <profile-sidebar/>
      </aside>

      <section class="profile__content">
        <div class="catalog-head" v-if="!pending || test_data">
          <BreadCrumbs />
          <h1 class="t-h--1 head-history">
            History
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
            <ProductsGrid :products="products" :items-per-row="4" :items-per-page="16"
                          :pending="pending && !loadMore"/>
          </section>
          <!-- История пуста -->
          <div class="empty-catalog d-flex justify-between align-center" v-else>
            <div class="empty-catalog__text">
              <h2>Here is empty...</h2>
              <p>The product will be added here after you visit its page</p>
            </div>
            <NuxtLink :to="'/'" class="btn btn--primary">Return</NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
  import {useBreadCrumbs, useCatalogProducts} from "~/composables/catalogState";
  import {getFavorites} from "~/utils/getFavorites";

  const route = useRoute()

  const products = useCatalogProducts()
  const breadcrumbs = useBreadCrumbs()

  const loadMore = ref(false)
  const limit = ref(16)
  const pending = ref(true)

  breadcrumbs.value = [{"langTitle":"Home","url":"/"}]

   const getProducts = () => {
     pending.value = true
     setTimeout(() => pending.value = false, 400)

     let prodFav = getFavorites().products
     products.value = Object.fromEntries(Object.entries(prodFav).slice(0, 12))
  }

  // Слушаем, когда нажали на Load More
  const { $listen } = useNuxtApp()
  $listen('loadMore', (status) => {
    loadMore.value = status
  })

  const setSeo = () => {
    let meta_title = 'History | Marketplace'

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

.head-history
  margin 0 0 32px 0 !important

.empty-catalog
  background var(--bg-gray)
  padding 32px
  border-radius 16px

  &__text
    h2
      margin 0 0 16px

    p
      margin 0
</style>