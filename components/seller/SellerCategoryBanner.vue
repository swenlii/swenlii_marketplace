<template>
  <!-- Баннер в конце страницы, вдруг у этого продавца недостаточно товаров -->
  <NuxtLink :to="catalogPath" class="seller-category-banner d-flex align-center justify-between">
    <div class="seller-category-banner__left flex-column">
      <div class="seller-category-banner__title t-h--3">Didn't find the product you need?</div>
      <div class="t-text--s">More products in this category here</div>
    </div>
    <div class="seller-category-banner__right">
      <button class="btn btn--white">Explore</button>
    </div>
  </NuxtLink>
</template>

<script setup>
  const route = useRoute()
  const catalogPath = ref(route.path.includes('/products/')?`/products/${route.params.class_url}`:`/catalog/${route.params.category_url || route.params.class_url}`)
</script>

<style lang="stylus">
.seller-category-banner
  height 89px
  border-radius 4px
  background #333
  color #fff
  padding 24px 24px 24px 28px
  margin-top 32px
  @media (max-width: 1199px)
    padding 24px
  @media (max-width: 767px)
    height auto
    flex-direction column
    align-items stretch
    gap 25px
  &__title
    @media (max-width: 767px)
      font-size 14px
      font-weight 700
      line-height 17px
  &__left
    gap 4px
  &__right .btn
    width 174px
    justify-content center
    @media (max-width: 767px)
      width 100%
</style>