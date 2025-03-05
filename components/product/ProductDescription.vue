<template>
  <div class="product-description" v-if="!pending">
    <div class="product-description__text t-text--s" :class="{active: showMore}" v-html="PRODUCT_INFO.description.text"></div>
    <button class="product-description__more t-ui--s color-accent"
            v-show="PRODUCT_INFO.description.text.length > 540"
            :class="{active: showMore}"
            @click="showMore = !showMore">
      {{ showMore ? 'Hide' : 'See more...' }}
    </button>
  </div>
  <div class="product-description__skeleton" v-else>
    <div class="mask" v-for="i in 4" :key="i"></div>
  </div>
</template>

<script setup>
import { useProductInfo } from "~/composables/catalogState";

const props = defineProps(['pending'])

const showMore = ref(false)

const PRODUCT_INFO = useProductInfo()
</script>

<style lang="stylus">
  .product-description
    @media (max-width: 1199px)
      border-bottom 1px solid #f3f3f5
    &__text
      max-height 45px
      overflow hidden
      text-overflow ellipsis
      -webkit-line-clamp 3
      display -webkit-box
      -webkit-box-orient vertical
      &.active
        max-height none
        -webkit-line-clamp unset
    &__more
      margin-top 8px
      @media (max-width: 1199px)
        margin-bottom 16px
    &__skeleton
      .mask
        background white
        width 100%
        height 13px
        margin-bottom 3px
        &:nth-child(4)
          width 68px
          height 14px
          margin-top 8px
          margin-bottom 0
</style>