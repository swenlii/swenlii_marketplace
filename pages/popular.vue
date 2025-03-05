<template>
  <main>
    <div class="container">
      <Catalog :title="'Popular now'"
               info-api-url="/discounted-products"
               products-api-url="/get-products/discounted"
               :sidebar-disabled="true"
      />
    </div>
  </main>
</template>