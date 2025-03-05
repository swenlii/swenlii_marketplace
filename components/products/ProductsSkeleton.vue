<template>
  <div class="product-mask">
    <div class="mask"></div>
    <div class="mask"></div>
    <div class="mask"></div>
    <div class="mask"></div>
    <div class="mask"></div>
  </div>
</template>

<style lang="stylus">
.product-mask
  background #fff
  width 100%
  z-index 3
  padding-top 8px

  @media (max-width: 1199px)
    width calc((100vw - 70px)/4)
    margin-right 8px
    &:last-child
      margin-right 0

  @media (max-width: 767px)
    width calc((100vw - 45px) / 2)
    margin-right 8px

  div
    &:nth-child(1)
      padding-top calc(100%)
      border-radius 4px
      margin-bottom 8px

    &:nth-child(2), &:nth-child(3), &:nth-child(4)
      height 13px
      margin-top 3px

    &:nth-child(5)
      height 19px
      width 75px
      margin-top 12px
</style>