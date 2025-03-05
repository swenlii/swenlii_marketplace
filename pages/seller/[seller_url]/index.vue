<template>
  <main>
    <div class="container">
      <Catalog :info-api-url="`/seller/${route.params.seller_url}`"
               products-api-url="/get-products/seller-all" :unusual-seo="true" @setSeo="setSeo">
        <template v-slot:header>
          <SellerHeader/>
          <SellerTabs/>
        </template>
        <template v-slot:content-top>
          <div class="catalog-head">
            <h2 class="t-h--1">
              All items
            </h2>
          </div>
        </template>
      </Catalog>
    </div>
  </main>
</template>

<script setup>
  import {useCatalogInfo} from "~/composables/catalogState";

  const route = useRoute()
  const sellerInfo = useCatalogInfo()

  const setSeo = () => {
    let title = sellerInfo.value?.seller.seller_title + ' | Marketplace'

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
</script>
