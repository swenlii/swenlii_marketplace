<template>
  <div class="cart-store__divider"></div>

  <li class="cart-product d-flex align-start justify-between" v-if="product?.count">
    <label class="cart-checkbox d-flex align-center relative hidden-mobile"
           :class="{'disabled' : productUnavailble}">
      <input type="checkbox"
             :name="product.title"
             :checked="product.checkbox"
             :value="product.checkbox"
             @change="changeProductCheck(storeIndex, productIndex)"/>
      <span class="cart-checkbox__check"></span>
    </label>
    <div class="cart-product__shape">
      <div class="cart-product__img--discount t-ui--xs"
           v-if="+discount > 0 && !productUnavailble" aria-hidden="true">
        -{{discount}}%
      </div>
      <NuxtLink :to="`/product/${product.url}`"
                class="cart-product__img d-flex align-center justify-center"
                :class="{'cart-product__img-disabled': productUnavailble}">
        <img :src="product.images_s3_url" :alt="product.title"/>
      </NuxtLink>
    </div>

    <div class="cart-product__blocks">
      <div class="cart-product__top">
        <div class="cart-product__info">
          <NuxtLink :to="`/product/${product.url}`"
                    class="t-text--m" :class="{'cart-product__unavailable' : productUnavailble}">
            {{ product.title }}
          </NuxtLink>
          <div class="cart-product__counter d-flex align-center" v-if="!productUnavailble">
            <button aria-label="Remove one"
                    @click.prevent="removeOne(product.id,storeIndex,productIndex,product.count)">
              <nuxt-icon name="ui/minus"/>
            </button>
            <div class="cart-product__counter-value t-ui--s">
              {{ product.count }}
            </div>
            <button aria-label="Add one"
                    :class="{'btn--disabled': product.count >= +product.availble}"
                    @click.prevent="changeProductQuantity(product.id,storeIndex,productIndex,1)">
              <nuxt-icon name="ui/plus"/>
            </button>
          </div>
          <div class="cart-product__outofstock t-ui--s" v-else>
            Out of Stock
          </div>
        </div>
        <label v-if="+product.availble >= 1 && product.price > 0"
               class="cart-checkbox d-flex align-center relative hidden-desktop hidden-tablet">
          <input type="checkbox"
                 :name="product.title"
                 :checked="product.checkbox"
                 :value="product.checkbox"
                 @change="changeProductCheck(storeIndex, productIndex)"/>
          <span class="cart-checkbox__check"></span>
        </label>
      </div>
      <div class="cart-product__bottom d-flex align-center justify-between">
        <div class="cart-product__actions d-flex align-center">
          <button class="t-ui--s d-flex" @click="delFromCart">
            <nuxt-icon name="ui/cart-del" filled/> <span class="hidden-mobile">Remove</span>
          </button>
        </div>
        <div v-if="!productUnavailble"
             class="cart-product__price d-flex">
          <div class="cart-product__price-new d-flex t-title--l">
            {{ (product.price * product.count / 100 | 0) }}
            <span>.<template v-if="(product.price * product.count)%100 < 10">0</template>{{ (product.price * product.count) % 100 }}</span>
            $
          </div>
          <div class="cart-product__price-old d-flex align-center" v-if="+product.oldprice - product.price > 0">
            <s class="d-flex align-center t-ui--s color-gray" aria-hidden="true">
              {{ (+product.oldprice * product.count / 100 | 0) }}
              <span>.<template v-if="+(product.oldprice * product.count)%100 < 10">0</template>{{ (+product.oldprice * product.count) % 100 }}</span>
            </s>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
  import {
    changeProductQuantity,
    useCartProducts,
    deleteFromCart,
    getCartProducts,
    changeProductCheck
  } from "~/composables/cartState";

  const props = defineProps(['product'])

  const productUnavailble = computed(() => {
    return (+props.product.availble < 1 || +props.product.price <= 0 )
  })

  const discount = computed(() => {
    let disc = Math.round(((+props.product.oldprice - props.product.price) / props.product.oldprice) * 100)
    return disc < 1 ? 1 : disc
  })

  const cartProducts = useCartProducts()

  const removeOne = (productId, storeId, productIndex, productCount) => {
    if (productCount < 2) {
      delFromCart()
    } else {
      changeProductQuantity(productId, storeId, productIndex, -1)
    }
  }

  // Индекс магазина в массиве корзины
  const storeIndex = computed(() => {
    let stores = cartProducts.value
    return stores.findIndex((el) => {
      let store_id = props.product.store_id || props.product.store
      return el.provider_store_id === store_id
    })
  })

  // Индекс продукта в массиве продуктов магазина
  const productIndex = computed(() => {
    let stores = cartProducts.value
    return stores[storeIndex.value].products.findIndex((el) => {
      return el.id === props.product.id
    })
  })

  const delFromCart = async () => {
    await deleteFromCart(props.product.id)
    getCartProducts()
  }
</script>

<style lang="stylus">
  .cart-product
    gap 12px
    position relative
    &__shape
      position relative
    &__img
      width 90px
      height 90px
      object-fit cover
      border-radius 4px
      background var(--bg-gray)
      overflow hidden
      img
        width 100%
        height 100%
        object-fit cover
        filter brightness(0.97)
      &-disabled
        filter grayscale(0.9)
      &--discount
        background #333
        color white
        font-weight 800
        font-size 12px
        line-height 14px
        padding 4px 8px
        border-radius 4px
        position absolute
        bottom -4px
        left -4px
        z-index 2
    &__blocks
      flex 1
      display flex
      flex-direction column
      justify-content space-between
      min-height 90px
    &__unavailable
      color #777
    &__top
      @media (max-width: 767px)
        display flex
        justify-content space-between
        align-items flex-start
        gap 12px
    &__info
      display flex
      gap 8px
      align-items flex-start
      justify-content space-between
      @media (max-width: 767px)
        flex-direction column
        a
          font-size 12px
          line-height 14px
          max-height 28px
          overflow hidden
          text-overflow ellipsis
          -webkit-line-clamp 2
          display -webkit-box
          -webkit-box-orient vertical
    &__price
      gap 1px
      align-items end
      &-new
        span
          font-size 12px
          display block
          position relative
          top 1px
      &-old
        margin-left 4px
        span
          font-size 10px
          margin-right 2px
          display block
          position relative
          top 1px
        s
          position relative
          margin-bottom 2px
          &::after
            content ''
            display block
            width 100%
            height 1px
            position absolute
            top 50%
            left 0
            transform translateY(-50%)
            background var(--text-base)
    &__outofstock
      background #333
      color white
      border-radius 4px
      padding 4px 8px
    &__bottom
      gap 12px
      flex-shrink 0
      min-width 220px
      flex-direction row-reverse
      @media (max-width: 767px)
        margin-top 16px
    &__actions
      gap 16px
      button
        gap 4px
        svg path
          stroke #333
    &__counter
      gap 4px
      padding 0 2px
      button
        height 24px
        width 24px
        background #333
        color white
        border-radius 4px
        display flex
        justify-content center
        align-items center
      &-value
        min-width 24px
        text-align center
    .checkbox input:checked + .checkbox__check
      background-color #333

.without-check
  margin-left 32px
  @media (max-width: 767px)
     margin-left 0

</style>