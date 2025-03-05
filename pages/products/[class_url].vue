<template>
  <main>
    <div class="container">
      <Catalog :info-api-url="`/products/${route.params.class_url}`"
               products-api-url="/get-products/class"
               :static-filters-api-url="`/static-filters-by-class/${route.params.class_url}`"
      />
    </div>
  </main>
</template>

<script setup>
  const route = useRoute()
</script>