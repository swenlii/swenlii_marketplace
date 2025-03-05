<template>
  <div>
    <div class="product-head" v-if="!pending">
      <h1 class="product-head__title t-h--3" v-if="PRODUCT_INFO?.title" v-html="PRODUCT_INFO?.title"></h1>
      <!-- В API такой инфы нет, но сделаем вид, что есть -->
      <div class="product-head__bottom d-flex align-center justify-between t-ui--s">
        <div class="product-head__info d-flex align-center">
          <div class="d-flex align-center">2 ratings</div>
          <div class="d-flex align-center">1092 sold</div>
          <div class="d-flex align-center" v-if="PRODUCT_INFO?.id">IID: {{PRODUCT_INFO?.id}}</div>
        </div>
      </div>
    </div>
    <div class="product-head__skeleton" v-else>
      <div class="mask" v-for="i in 3" :key="i"></div>
    </div>
  </div>
</template>

<script setup>
import {useProductInfo} from "~/composables/catalogState";

const PRODUCT_INFO = useProductInfo()

const props = defineProps(['pending'])

</script>

<style lang="stylus">
.product-head
  margin-bottom 24px
  @media (max-width: 1199px)
    margin-top 32px
  &__skeleton
    margin-bottom 24px
    .mask
      background white
      &:nth-child(1)
        height 28px
        margin-bottom 2px
        width 100%
      &:nth-child(2)
        height 28px
        width 100%
      &:nth-child(3)
        height 14px
        width 222px
        margin-top 12px
  &__title
    @media (max-width: 767px)
      font-size 18px
      line-height 24px
  &__bottom
    margin-top 12px
    @media (max-width: 1199px)
      margin-top 8px
      padding-bottom 16px
  &__info
    gap 8px
    color var(--text-gray)
    > *
      &::after
        content ''
        display block
        margin-left 8px
        width 1px
        height 10px
        background var(--bg-gray)
      &:last-child::after
        display none
  &__rating
    gap 4px
  &__actions
    color var(--text-base)
    gap 17px
    button
      gap 4px
</style>