<template>
  <li class="relative">
    <div class="product-item">
      <!-- Блок картинки, на ней скидка и кнопки -->
      <div class="relative product-item__shape">
        <div class="product-item__discount t-ui--s"
             v-if="+product.discount" aria-hidden="true">
          -{{ product.discount }}%
        </div>
        <NuxtLink :to="`/product/${product.url}`" class="product-item__img">
          <div class="product-item__img-wrap d-flex">
            <img :src="product.image_s3_url"
                 :alt="product.title"
                 loading="lazy"/>
          </div>

          <div class="product-item__buttons" v-if="+product.price && +product.reserve">
            <div class="product-item__cart-btns d-flex align-center justify-center"
                 :class="{'in-cart': inCart}" @click.stop.prevent>
              <div class="product-item__btn-in-cart" v-if="inCart">
                <button @click="addToCart(product.id,true)" aria-label="Remove one">
                  <nuxt-icon name="ui/minus"/>
                </button>
                <div class="product-item__counter">{{ inCart }}</div>
                <button @click="addToCart(product.id)" aria-label="Add one"
                        :class="{'disabled': (+product.reserve <= inCart)}">
                  <nuxt-icon name="ui/plus"/>
                </button>
              </div>
              <button class="product-item__btn t-ui--s" @click="addToCart(product.id)" v-else>
                Add to Cart
              </button>
            </div>
          </div>
        </NuxtLink>
      </div>

      <NuxtLink :to="`/product/${product.url}`" class="product-item__title t-text--s">
        <span v-html="product.title"></span>
      </NuxtLink>

      <div class="d-flex product-item__price">
        <div  class="product-item__price-new d-flex t-title--l"
             v-if="+product.price">
          {{ (product.price / 100 | 0) }}
          <span>.<template v-if="product.price%100 < 10">0</template>{{ product.price % 100 }}</span>
          <div>$</div>
        </div>
        <div class="product-item__price-old d-flex align-center" v-if="+product.price && +product.discount">
          <s class="d-flex align-center t-ui--s color-gray"
             aria-hidden="true">
            {{ (product.oldPrice / 100 | 0) }}
            <span>.<template v-if="product.oldPrice%100 < 10">0</template>{{ product.oldPrice % 100 }}</span>
          </s>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import {useGlobalCart, addToCart} from "~/composables/cartState";

const props = defineProps(['product'])

const globalCart = useGlobalCart()

const inCart = computed(() => {
  return +globalCart.value?.products?.find((el) => el.id === props.product.id)?.count || 0
})
</script>

<style lang="stylus">
.product-item
  position relative
  padding-top 8px

  &__discount
    position absolute
    top 4px
    left 4px
    z-index 2
    background #333
    color #fff
    padding 4px 8px
    font-weight 800
    border-radius 4px

  &__shape
    position relative
    display flex
    flex-direction column
    border-radius 4px
    background white
    height 100%

  &__img
    display block
    position relative
    border-radius 4px
    overflow hidden

    &::before
      content ''
      display block
      padding-top calc(100%)

    &-wrap
      position absolute
      top 0
      left 0
      width 100%
      height 100%

      img, picture
        width auto
        height 100%
        mix-blend-mode darken
        color var(--bg-gray)
        position absolute
        top 0
        left 50%
        transform translateX(-50%)

  &__buttons
    position absolute
    width 100%
    height 40px
    padding 4px
    bottom 0
    display flex
    justify-content space-between
    flex-direction row-reverse

  &__cart-btns
    background #fff
    border 1px solid var(--border-gray)
    border-radius 4px
    height 32px
    width 120px
    padding 0 12px
    transition width 320ms ease-in-out
    z-index 1

    &.in-cart
      width 100%

  &__btn-in-cart
    padding 4px 8px
    width 100%
    display flex
    justify-content space-between
    gap 16px
    .disabled
      opacity .3
      pointer-events none

  &__counter
    flex 1
    text-align center

  &__title
    margin-top 8px
    letter-spacing 0.03em
    height 45px
    overflow hidden
    text-overflow ellipsis
    -webkit-line-clamp 3
    display -webkit-box
    -webkit-box-orient vertical

  &__price
    margin-top 12px
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
</style>