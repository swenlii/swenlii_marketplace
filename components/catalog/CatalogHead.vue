<template>
  <div class="catalog-head" v-if="!pending">
    <div v-if="headerTitle">
      <BreadCrumbs/>
      <h1>
        {{ headerTitle }}
      </h1>
    </div>
  </div>
  <div class="catalog-head__skeleton" v-else>
    <div class="mask"></div>
    <div class="mask"></div>
  </div>
</template>

<script setup>
import {useCatalogInfo} from "~/composables/catalogState";
const props = defineProps(['pending', 'title'])
const catalogInfo = useCatalogInfo()

const headerTitle = computed(() => {
  if (catalogInfo.value?.title?.length) {
    return catalogInfo.value?.title
  }
  if (props.title) return props.title
  return false
})

</script>

<style lang="stylus">
.catalog-head
  h2
    @media (max-width: 1199px)
      font-size 22px
  h1
    font-size 44px
    font-weight 700
    margin 12px 0 38px
    @media (max-width: 1199px)
      font-size 32px
      line-height 42px
      margin 12px 0 16px
  &__center
    text-align center
    .breadcrumbs
      justify-content center
  &__skeleton
    > .mask
      width 100px
      height 14px
      &:nth-child(2)
        height 40px
        width 250px
        margin 12px 0 8px
        @media (max-width: 1199px)
          margin 8px 0
</style>