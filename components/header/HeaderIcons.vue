<template>
  <div class="header-icons">
    <!-- На все общие страницы, кроме популярного (у селлера, категории и продукта есть конкретный id) -->
    <NuxtLink to="/profile/favorites" class="header-icons__icon">
      <nuxt-icon :name="'ui/fav'" filled/>
      Favorites
    </NuxtLink>
    <NuxtLink to="/profile/orders" class="header-icons__icon">
      <nuxt-icon :name="'ui/orders'" filled/>
      Orders
    </NuxtLink>
    <NuxtLink to="/catalog" class="header__catalog btn btn--black hidden-desktop">
      Catalog
    </NuxtLink>
    <NuxtLink to="/profile/history" class="header-icons__icon">
      <nuxt-icon :name="'ui/time'" filled/>
      History
    </NuxtLink>
    <NuxtLink to="/cart" class="header-icons__icon relative">
      <nuxt-icon :name="'ui/cart'" filled/>
      Cart
      <span class="header-icons__cart-count t-ui--xs" v-if="globalCart?.total">{{globalCart?.total}}</span>
    </NuxtLink>
  </div>
</template>

<script setup>
import {useGlobalCart} from "~/composables/cartState"
  const globalCart = useGlobalCart()
</script>

<style lang="stylus">
.header-icons
  display flex
  align-items center
  margin-right 38px
  gap 38px
  @media (max-width: 767px)
    gap 16px
    margin-right 0
  &__icon
    display flex
    flex-direction column
    align-items center
    justify-content center
    gap 6px
    font-size 11px
    font-weight 600
    svg
      width 22px !important
      height 22px !important
      path
        fill #333
    @media (max-width: 767px)
      font-size 9px
      width 42px
      svg
        width 19px !important
        height 19px !important
  &__cart-count
    position absolute
    top 12px
    right -8px
    background #333
    color white
    width 16px
    height 16px
    border-radius 4px
    display flex
    justify-content center
    align-items center


</style>