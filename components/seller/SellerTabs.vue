<template>
  <div>
    <div class="seller-tabs" :class="{'mask' : !sellerInfo?.seller}">
      <div v-if="sellerInfo?.seller"
           class="seller-tabs__wrap"
           :class="`seller-tabs__wrap--${sellerInfo.activeTab}`">
        <button class="seller-tabs__tab t-ui--s" :class="{'active': !sellerInfo.activeTab}"
                @click="sellerInfo.activeTab = 0">
          All items
        </button>
        <button class="seller-tabs__tab t-ui--s" :class="{'active': sellerInfo.activeTab === 1}"
                @click="sellerInfo.activeTab = 1">
          Profile
        </button>
      </div>
    </div>
    <SellerProfile v-show="sellerInfo?.activeTab === 1"/>
  </div>
</template>

<script setup>
  import {useCatalogInfo} from "~/composables/catalogState";
  const sellerInfo = useCatalogInfo()
</script>

<style lang="stylus">
  .seller-tabs
    padding 16px
    border-radius 4px
    margin-bottom 24px
    background #333
    color white
    height 74px
    @media (max-width: 1199px)
      padding 16px
      margin 0 -16px 16px
      height auto
      border-radius 0
    &__wrap
      border 1px solid var(--border-gray)
      border-radius 5px
      position relative
      display inline-flex
      @media (max-width: 1199px)
        width 100%
      &::before
        content ''
        width 50%
        height 100%
        background #fff
        color white
        border-radius 3px
        box-shadow 0 4px 15px 0 rgba(0, 0, 0, .1)
        position absolute
        top 0
        left 0
        transition transform .3s ease-in-out
      &--1::before
        transform translateX(100%)
      button
        position relative
        padding 13px 12px
        width 180px
        transition color .3s ease-in-out
        @media (max-width: 1199px)
          width 50%
    &__tab.active
      color var(--text-base)
</style>