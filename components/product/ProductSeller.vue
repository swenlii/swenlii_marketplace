<template>
  <div v-if="!pending && PRODUCT_INFO?.id" class="seller-info">
    <div class="d-flex seller-info__block">
      <div class="seller-info__img">
        <img :src="PRODUCT_INFO.provider.image_s3_url" alt=""/>
      </div>
      <div class="seller-info__info">
        <div class="t-ui--xs seller-info--provided">Provided by</div>
        <NuxtLink :to="`/seller/${PRODUCT_INFO.provider.url}`" class="t-title--m seller-info--title">{{ PRODUCT_INFO.provider.title }}</NuxtLink>
      </div>
    </div>
    <NuxtLink class="seller-info__bth btn--white" :to="`/seller/${PRODUCT_INFO.provider.url}`">Go to seller page</NuxtLink>
  </div>
  <div class="seller-info__skeleton mask" v-if="pending"></div>
</template>

<script setup>
  import { useProductInfo } from "~/composables/catalogState";

  const props = defineProps(['pending'])

  const PRODUCT_INFO = useProductInfo()
</script>

<style lang="stylus">
  .seller-info
    display flex
    align-items flex-start
    justify-content space-between
    margin-top 32px
    background #333
    color white
    border-radius 4px
    padding 16px
    gap 12px
    @media (max-width: 1199px)
      width 100%
    @media (max-width: 767px)
      margin-top 0
      flex-direction column
      width 100vw
      border-radius 0
      margin-left -16px
    &__skeleton
      background-color white
      width 100%
      border-radius 4px
      height 84px
      margin-top 32px
      @media (max-width: 767px)
        margin-top 0
        width 100vw
        border-radius 0
        margin-left -16px
    span
      white-space nowrap
    &--provided
      color var(--text-gray)
    &--title
      margin-top 4px
    &__img
      min-width 50px
      min-height 50px
      border-radius 4px
      background white
      display flex
      align-items center
      justify-content center
      border: 1px solid #FFF;
      overflow hidden
      img
        width 50px
        height 50px
    &__bth
      display block
      padding 12px 13px
      font-size 12px
      line-height 14px
      font-weight 600
      border-radius 4px
      text-align center
      white-space nowrap
      @media (max-width: 767px)
        width 100%
    &__block
      gap 12px
    &__info
      display: flex
      justify-content center
      flex-direction column
</style>