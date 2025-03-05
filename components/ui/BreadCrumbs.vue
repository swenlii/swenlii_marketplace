<template>
  <nav class="breadcrumbs d-flex" aria-label="breadcrumbs" v-if="breadcrumbs && breadcrumbs.length">
    <template v-for="item in breadcrumbs" :key="item.url">
      <Nuxt-Link :to="item.url"
        class="d-flex align-center t-ui--m">
        {{ item.title || item.langTitle }}
        <nuxt-icon v-if="breadcrumbs?.length > 1" name="ui/breadcrumbs" size="12px" />
      </Nuxt-Link>
    </template>
  </nav>
</template>

<script setup>
import { useBreadCrumbs } from "~/composables/catalogState";
const breadcrumbs = useBreadCrumbs()
</script>

<style lang="stylus">
  .breadcrumbs
    gap 8px
    margin-bottom 16px
    @media (max-width 1200px)
      overflow-x auto
      width calc(100% + 32px)
      margin-left -16px
      padding 0 16px
      &::-webkit-scrollbar
        display none
    a
      gap 2px
      @media (max-width 1200px)
        white-space nowrap
      &:last-child
        .nuxt-icon.nuxt-icon--fill
          display none
      &:hover
        @media (hover)
          text-decoration underline
      svg
        color var(--text-gray)
</style>