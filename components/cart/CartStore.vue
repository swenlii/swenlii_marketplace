<template>
  <li class="cart-store">
    <div class="cart-store__head d-flex justify-between align-center">
      <div class="cart-store__name">
        <nuxt-icon name="ui/store" filled/>
        <NuxtLink :to="`/seller/${store.provider_url}`">
          {{ store.provider_name }}
        </NuxtLink>
      </div>
      <span class="cart-store__count t-ui--s">{{ count }} {{ count > 1 ? 'items' : 'item' }}</span>
    </div>

    <ul class="cart-store__products" aria-label="Products">
      <CartProduct v-for="product in store.products" :key="product.id"
                   :product="product"/>
    </ul>
  </li>
</template>

<script setup>
  const props = defineProps(['store'])
  const cartInfo = useCartInfo()

  // {{count}} items
  const count = computed(() => {
    const products = props.store.products
    let items = 0,
        total = 0
    for (let product of products) {
      items += +product.count
      if (product.checkbox) total += +product.count * +product.price
    }
    // Проверка на "можно сделать заказ"
    // У одного из продавцов (конкретно этого самого) итоговая сумма больше нуля
    if (total > 0) cartInfo.value.checkoutDisabled = false
    return items
  })
</script>

<style lang="stylus">
  .cart-store
    padding 19px 32px
    background #fff
    border-radius 4px
    @media (max-width: 767px)
      padding 16px
    &__head
      gap 32px
      @media (max-width: 1199px)
        width 100%
        gap 16px
    &__name
      display flex
      align-items center
      a
        font-weight 700
        font-size 16px
        margin-left 8px
        @media (max-width: 1199px)
          font-size 14px
    &__count
      color var(--text-gray)
      white-space nowrap
    &__divider
      height 1px
      width 100%
      border-bottom 1px solid #d2d1d1
      margin-top 16px
      margin-bottom 16px
</style>