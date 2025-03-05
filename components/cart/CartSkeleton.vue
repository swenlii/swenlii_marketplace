<template>
  <div class="cart-skeleton">
    <div class="cart__head d-flex align-center">
      <div class="mask"></div>
    </div>
    <div class="cart__head-buttons d-flex justify-between">
      <div class="cart__actions d-flex">
        <div class="mask"></div>
        <div class="mask"></div>
      </div>
      <div class="cart__count mask"></div>
    </div>

    <div class="cart__wrap d-flex align-start">
      <div class="cart__left">
        <div class="mask"></div>
      </div>
      <div class="cart__right">
        <div class="mask"></div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
  .container + .cart-skeleton
      display none

  .cart-skeleton
    .mask
      background #ffffff
    .cart__head
      .mask
        width 200px
        height 73px
        margin-bottom 26px
    .cart__actions
      gap 16px
      .mask
        width 93px
        height 20px
        &:last-child
          width 113px
    .cart__count
      width 151px
      height 20px
    .cart__left
      .mask
        height 600px
        border-radius 4px
    .cart__right
      .mask
        height 341px
        border-radius 8px
</style>