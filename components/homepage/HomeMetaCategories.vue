<template>
  <nav class="home-catalog" aria-label="Categories">
    <div class="home-catalog__line" v-if="categories?.length">
      <template v-for="(category, index) in categories.slice(0,8)" :key="index" >
        <NuxtLink :to="category.url" class="home-catalog__item t-text--s">
          {{ category.title }}
        </NuxtLink>
        <!-- Разделитель. Для того, чтобы разделитель был ровно посередине между блоками -->
        <div class="home-catalog__divider" v-if="index < 7"></div>
      </template>
    </div>
  </nav>
</template>

<script setup>
  const props = defineProps(['categories'])
</script>

<style lang="stylus">
.home-catalog
  margin-top 10px !important
  margin-bottom 10px
  &__line
    display flex
    justify-content space-between
    align-items center
    background #333
    color white
    border-radius 4px
    @media (max-width: 1199px)
      display grid
      grid-template-columns 1fr 1fr 1fr 1fr
      background white
      grid-gap 2px
    @media (max-width: 767px)
      display grid
      grid-template-columns 1fr 1fr
      background white
      grid-gap 2px
  &__item
    position relative
    display flex
    align-items center
    justify-content center
    text-align center
    font-size 14px
    font-weight 500
    height 40px
    padding 0 20px
    &:hover
      text-decoration underline
    @media (max-width: 1199px)
      font-size 12px
      font-weight 600
      background #333
      border-radius 4px
    &:nth-child(n + 8)
      @media (max-width: 767px)
        display none
  &__divider
    width 1px
    height 40px
    background white
    @media (max-width: 1199px)
      display none

</style>