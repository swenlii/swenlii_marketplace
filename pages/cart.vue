<template>
  <main class="cart-page">
    <ClientOnly>
      <div class="container">
        <!-- Корзина пуста -->
        <CartEmpty v-if="globalCart?.count === 0"/>

        <!-- Корзина не пуста -->
        <div class="cart" v-else-if="cartProducts?.length">
          <CartHead/>

          <div class="cart__wrap d-flex align-start">
            <div class="cart__left">
              <CartList/>
            </div>
            <div class="cart__right">
              <aside v-if="cartInfo">
                <div class="cart__panel">
                  <CartTotal v-if="cartInfo?.itemsCount"/>
                  <button @click="placeOrder"
                          class="btn btn--primary"
                          :class="{ 'btn--disabled': cartInfo?.checkoutDisabled || !cartInfo?.itemsCount }">
                    Place Order
                  </button>
                  <!-- В корзине только отсутствующие товары (OutOfStock) -->
                  <div class="t-ui--xs cart__alert d-flex align-center justify-center"
                       v-if="!cartInfo?.itemsCount">
                    No items available for purchase
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
        <!-- Корзина не пуста, но продукты ещё не вернулись -->
        <CartSkeleton v-else/>
      </div>
    </ClientOnly>
    <!-- SSR skeleton (Все данные рендерятся на клиенте, на сервере только скелет) -->
    <div class="cart-skeleton container">
      <CartSkeleton/>
    </div>
  </main>
</template>

<script setup>
  import {getCartProducts, useCartInfo, useCartProducts, useGlobalCart} from '~/composables/cartState';
  import {setModalState, useUsualMessage} from "~/composables/globalState"

  const cartProducts = useCartProducts()
  const globalCart = useGlobalCart()
  const cartInfo = useCartInfo()
  const usualMessage = useUsualMessage()

  const updateCart = ref(null)

  cartProducts.value = null

  // Конечно мы не размещаем заказы
  const placeOrder = () => {
    usualMessage.value = {
      title: "There is nothing there ;)",
      text: 'Placing an order is not available in the DEMO version'
    }
    setModalState('usualModal', true)
  }

  await useLazyAsyncData('cartProducts', getCartProducts, {
    server: false
  })

  useSeoMeta({
    title: 'Cart | Marketplace',
    ogTitle: 'Cart | Marketplace',
    twitterTitle: 'Cart | Marketplace'
  })

  onMounted(() => {
    // Обновление корзины раз в 10 сек (или в заданное время)
    updateCart.value = setInterval(() => {
      if (!document.hidden && !document.creatingOrder) {
        getCartProducts()
      }
    },window.cartUpdate * 1000 || 10000)
  })

  onBeforeUnmount(() => {
    clearInterval(updateCart.value)
  })

</script>

<style lang="stylus">
  .cart-page
    background var(--bg-gray)
    @media (max-width: 1199px)
      min-height calc(100vh - 50px)
      padding-top 16px
    @media (max-width: 767px)
      padding-top 0

  .cart
    @media (max-width: 1199px)
      width calc(100% + 32px)
      margin-left -16px
    &__wrap
      gap 32px
      margin-top 24px
      @media (max-width: 1199px)
        margin-top 16px
        flex-direction column
        gap 16px
    &__left
      width 728px
      @media (max-width: 1199px)
        width 100%
    &__right
      width 350px
      position sticky
      top 35px
      @media (max-width: 1199px)
        width 100%
        position static
    &__panel
      padding 32px
      padding-top 16px
      background #fff
      border-radius 4px
      @media (max-width: 1199px)
        box-shadow none
        border-radius 4px
        padding 16px
      @media (max-width: 767px)
        border-radius 0
      &-skeleton
        gap 8px
        .mask
          height 20px
      .btn
        margin-top: 16px
        width 100%
        max-width 300px
    &__alert
      margin-top 8px

  .cart-checkbox
    cursor pointer
    gap 8px
    &.disabled
      opacity .3
      pointer-events none
    &__check
      width 20px
      height 20px
      background var(--bg-gray)
      border-radius 4px
      border 1px solid var(--border-gray)
      flex-shrink 0
    input
      position absolute
      opacity 0
      pointer-events none
      &:checked + .cart-checkbox__check
        border none
        background-color var(--text-base)
        background-image url('~/assets/img/check.svg')
        background-repeat no-repeat
        background-position center
</style>