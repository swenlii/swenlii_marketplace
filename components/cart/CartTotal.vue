<template>
  <dl class="cart-total">
    <h2 class="cart-total--title t-h--3">Calculations</h2>
    <div class="cart-total__tr">
      <dt class="cart-total__td t-ui--s">
        Quantity of items
      </dt>
      <dd class="cart-total__td t-text--s">
        {{ cartInfo.itemsCount }}
      </dd>
    </div>
    <div class="cart-total__tr">
      <dt class="cart-total__td t-ui--s">
        Items price
      </dt>
      <dd class="cart-total__td t-text--s">
        {{ (cartInfo.itemsTotalOld / 100).toFixed(2) }} $
      </dd>
    </div>
    <div class="cart-total__tr" v-if="cartInfo.totalDiscount">
      <dt class="cart-total__td cart-total__td--discount t-ui--s d-flex align-center">
        Average discount
      </dt>
      <dd class="cart-total__td cart-total__td--accent t-text--s">
        – {{ (cartInfo.discountPercent).toFixed(1) }} %
      </dd>
    </div>
    <div class="cart-total__tr" v-if="cartInfo.totalDiscount">
      <dt class="cart-total__td cart-total__td--discount t-ui--s d-flex align-center">
        Discount value
      </dt>
      <dd class="cart-total__td cart-total__td--accent t-text--s">
        – {{ (cartInfo.totalDiscount / 100).toFixed(2) }} $
      </dd>
    </div>
    <div class="cart-total__tr">
      <dt class="cart-total__td t-ui--s">
        Delivery
      </dt>
      <dd class="cart-total__td t-text--s" v-if="cartInfo.totalDeliveryPrice">
        {{ (cartInfo.totalDeliveryPrice / 100).toFixed(2) }} $
      </dd>
      <dd class="cart-total__td t-text--s d-flex" v-else>
        <span class="t-ui--s green-text">Free</span> <s class="old_delivery">5 $</s>
      </dd>
    </div>
    <div class="cart-total__tr cart-total__total">
      <dt class="cart-total__td t-h--4">Total</dt>
      <dd v-if="total[0]" class="cart-total__td t-h--4 d-flex align-start">
        {{ total[0] }}
        <span class="cart-total__currency t-ui--xxs">
              .{{ total[1] }}
        </span>
        $
      </dd>
    </div>
  </dl>
</template>

<script setup>
  import {useCartInfo} from "~/composables/cartState";

  const cartInfo = useCartInfo()

  const total = computed(() => {
    return [Math.floor((cartInfo.value.total) / 100), String(parseInt(cartInfo.value.total)).slice(-2)]
  })
</script>

<style lang="stylus">
  .cart-total
    padding 8px 0 0
    &--title
      margin-bottom: 11px;
      padding-bottom: 16px;
    &__tr
      display flex
      justify-content space-between
      margin-bottom 12px
      position relative
      &:last-child
        margin-bottom 0
      &::before
        content ""
        width 100%
        position absolute
        bottom 2px
        left 0
        border-bottom 1px dotted #333
        z-index 1
    &__td
      background white
      margin 0 !important
      z-index 2
      .green-text
        color #366E36
      .old_delivery
        color var(--text-gray)
        position relative
        margin-left 4px
        &::after
          content: ''
          display block
          width 100%
          height 1px
          position absolute
          top 40%
          border-top 1px solid var(--text-base)
      &:first-child
        padding-right 2px
      &:last-child
        padding-left 2px
    &__currency
      margin-top 2px
      margin-left 1px
    &__total
      margin-top 8px
      padding-top 16px
      &::before
        content none
</style>