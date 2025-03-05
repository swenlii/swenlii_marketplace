<template>
  <ul class="cart-list flex-column" aria-label="Stores">
    <CartStore v-for="store in providers"
               :key="store.provider_id"
               :store="store"
    />
  </ul>
</template>

<script setup>
  import {useCartProducts} from "~/composables/cartState";
  const cartProducts = useCartProducts()

  const providers = computed(() => {
    let stores = JSON.parse(JSON.stringify(cartProducts.value))
    let array = []
    for (let store of stores) {
      if (!array.length) {
        array.push(store)
      } else {
        let found = array.find((el) => {
          return el.provider_id === store.provider_id
        })
        if (found) {
          found.products = [...found.products,...store.products]
        } else {
          array.push(store)
        }
      }
    }
    return array
  })
</script>

<style lang="stylus">
  .cart-list
    gap 16px
    @media (max-width: 1199px)
      gap 16px
</style>