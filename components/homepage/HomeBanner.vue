<template>
  <div v-if="banner?.show" :style="{backgroundColor: banner.bgColor, color: banner.color, backgroundImage: banner.image ? `url(${banner.image})` : banner.bgColor}" class="banner-layout d-flex flex-column justify-center">
    <div class="banner-layout__title">{{ banner.title }}</div>
    <p class="banner-layout__text t-text--s">{{ banner.text }}</p>
    <NuxtLink class="banner-layout__btn btn btn--white" :to="'https://github.com/swenlii'" target="_blank">
      Go to my website
    </NuxtLink>
  </div>
</template>

<script setup>
let props = defineProps(['banner'])
</script>

<style lang="stylus">
  .banner-layout
    position relative
    border-radius 4px
    height 187px
    padding 0 48px
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.20)
    gap 12px
    background-size cover
    background-position center
    @media (max-width: 1199px)
      padding 0 32px
      height 150px
    @media (max-width: 768px)
      background-image none !important
      height max-content
      padding 16px 20px
    &__title
      font-size 32px
      font-weight 800
      @media (max-width: 1199px)
        font-size 24px
      @media (max-width: 768px)
        font-size 20px
        font-weight 900
        line-height 24px
    &__text
      font-size 14px
      font-weight 500
      @media (max-width: 1199px)
        font-size 12px
      @media (max-width: 768px)
        font-weight 600
        font-size 11px
    &__btn
      width max-content
      padding 7px 12px
      border-radius 4px
      @media (max-width: 1199px)
        height 34px
</style>