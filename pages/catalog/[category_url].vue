<template>
  <main>
    <div class="container">
      <Catalog :info-api-url="`/catalog/${route.params.category_url}`"
               products-api-url="/get-products/category"
      />
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
</script>