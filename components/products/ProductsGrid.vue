<template>
  <div :class="{'horizontal-grid' : horizontal}">
    <ul class="products-grid" :class="`products-grid--${itemsPerRow}`">
      <template v-if="!products || pending">
        <ProductsSkeleton v-for="index of itemsPerPage" :key="index"/>
      </template>
      <template v-else>
        <ProductsItem v-for="product in products" :key="product.id" :product="product"/>
      </template>
    </ul>
  </div>
</template>

<script setup>
  const props = defineProps(['itemsPerPage','itemsPerRow','products','pending','horizontal'])
</script>

<style lang="stylus">
.products-grid
  display grid
  grid-gap 30px
  grid-row-gap 24px
  @media (max-width: 1199px)
    grid-gap 12px
  &--6
    grid-template-columns repeat(6, minmax(0, 1fr))
  &--4
    grid-template-columns repeat(4, minmax(0, 1fr))
  @media (max-width: 1199px)
    grid-template-columns repeat(4, minmax(0, 1fr))
  @media (max-width: 767px)
    grid-template-columns repeat(2, minmax(0, 1fr))

.horizontal-grid
  @media (max-width: 1199px)
    overflow-x auto
    margin 0 -16px
    &::-webkit-scrollbar
      -webkit-appearance: none
      width: 0
      height: 0
      display: none

    .products-grid
      display flex
      width fit-content
      grid-gap 8px
      padding 0 16px

      > li
        width calc((100vw - 70px) / 4)
  @media (max-width: 767px)
    .products-grid > li
      width calc((100vw - 45px) / 2)

</style>