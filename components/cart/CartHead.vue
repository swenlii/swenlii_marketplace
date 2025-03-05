<template>
  <div class="cart__head">
    <div class="cart__head-title d-flex relative">
      <h1 class="t-h--1">Cart</h1>
    </div>

    <div class="cart__head-actions d-flex justify-between align-end">
      <div class="cart__head-buttons d-flex justify-start">
        <div class="d-flex cart__head-selectall">
          <label class="cart-checkbox d-flex align-center relative">
            <input type="checkbox"
                   name="selected-all"
                   :checked="selected.all"
                   :value="selected.all"
                   @change="selectAllProducts(!selected.all)"/>
            <span class="cart-checkbox__check"></span>
            <span class="cart-checkbox__label t-ui--m">Select all</span>
          </label>
        </div>
        <button @click="deleteSelected"
                class="t-ui--m cart__head-delete d-flex align-center"
                :class="{'btn--disabled': !selected.one}">
          <nuxt-icon name="ui/x" class="hidden-desktop"/>
          Delete selected
        </button>
      </div>
      <div>
        <!-- Кол-во товаров (2 items from 1 store) -->
        <p class="cart__count t-ui--m" v-if="cartInfo?.storesCount" >
          {{cartInfo?.itemsCount}} {{cartInfo?.itemsCount > 1 ? 'items' : 'item'}}
          from {{cartInfo?.storesCount}} {{cartInfo?.storesCount > 1 ? 'stores' : 'store'}}
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
  import {useCartInfo, useCartProducts, selectAllProducts, deleteSelected} from "~/composables/cartState";

  const cartInfo = useCartInfo()
  const cartProducts = useCartProducts()

  const selected = computed(() => {
    if (!cartProducts.value) return false
    let disabledProducts = [];
    let checkedProducts = []

    cartProducts.value.forEach((store) => {
      store.products.forEach((product) => {
        // Если товар с выключенным чекбоксом, но доступен - значит выключен вручную
        if (!product.checkbox && product.availble > 0 && product.price > 0) disabledProducts.push(product.id)
        if (product.checkbox) checkedProducts.push(product.id)
      })
    })

    return {
      all: !disabledProducts.length,
      one: checkedProducts.length
    }
  })

</script>

<style lang="stylus">
  .cart__head
    @media (max-width: 1199px)
      background #fff
      padding 16px 16px 8px
      border-radius 4px
    @media (max-width: 767px)
      border-radius 0
    &-title
      gap 8px
      flex-direction column
      @media (max-width: 1199px)
        align-items center
    h1
      font-size 60px
      margin-bottom 26px
      @media (max-width: 1199px)
        font-size 40px
      @media (max-width: 767px)
        font-size 32px
  .cart__head-actions
    display flex
    justify-content space-between
    align-items end
    @media (max-width: 767px)
      display block
  .cart__count
    color var(--text-gray)
    @media (max-width: 767px)
      margin-top 16px
      text-align center
  .cart__head-buttons
    gap 16px
    @media (max-width: 1199px)
      flex-direction row-reverse
      justify-content space-between
      button
        font-size 12px
        color var(--text-gray)
  .cart__head-selectall
    gap 8px
    align-items center
    .cart-checkbox__label
      font-size 14px
      font-weight 600
    @media (max-width: 1199px)
      font-size 12px
      .cart-checkbox
        flex-direction row-reverse
      .cart-checkbox__label
        font-size 12px
        color var(--text-gray)
    .cart-checkbox input:checked + .cart-checkbox__check
      background-color var(--accent)
  .cart__head-delete
    gap 4px
    svg
      width 10px !important
      height 10px !important
      fill var(--text-gray)
</style>