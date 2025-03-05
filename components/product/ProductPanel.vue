<template>
  <div>
    <section class="product-panel d-flex align-center" v-if="!pending && PRODUCT_INFO?.id">

      <div class="product-panel__price d-flex" v-if="+PRODUCT_INFO.price > 0">
        <div class="flex-column align-end" v-if="+PRODUCT_INFO.discount">
          <s class="product-panel__price-old t-ui--m d-flex align-start">
            {{ (+PRODUCT_INFO.oldPrice / 100) }}
            <span>.<template v-if="PRODUCT_INFO.oldPrice%100 < 10">0</template>{{ PRODUCT_INFO.oldPrice % 100 }}</span> $
          </s>
          <div class="product-panel__price-save t-ui--xs">
            Save {{ (+PRODUCT_INFO.oldPrice - +PRODUCT_INFO.price) / 100 }} $
          </div>
        </div>

        <div class="product-panel__price-current t-h--2 d-flex align-start">
          {{ Math.floor(+PRODUCT_INFO.price / 100) }}
          <span>.<template v-if="PRODUCT_INFO.price%100 < 10">0</template>{{ PRODUCT_INFO.price % 100 }}</span> $
        </div>
      </div>

      <!-- Все 3 вида кнопок + Share-->
      <div class="product-panel__buttons">
        <button class="product-panel__outOfStock btn btn--disabled product-panel__btn--main" v-if="+PRODUCT_INFO.price <= 0 || +PRODUCT_INFO.rest < 1">
          Out Of Stock
        </button>

        <button class="btn btn--primary product-panel__btn--main" v-else-if="!inCart" @click="toCart(PRODUCT_INFO.id);">
          <span>Add to Cart</span>
        </button>

        <div class="d-flex product-panel__counter product-panel__btn--main" v-else-if="inCart">
          <button class="btn btn--black" @click="toCart(PRODUCT_INFO.id,true, false)">
            <nuxt-icon name="ui/minus"/>
          </button>
          <span class="product-panel__counter-value d-flex align-center justify-center t-ui--m">{{ inCart }}</span>
          <button class="btn btn--black" @click="toCart(PRODUCT_INFO.id);"
                  :class="{'btn--disabled':+PRODUCT_INFO.rest <= inCart}">
            <nuxt-icon name="ui/plus"/>
          </button>
        </div>

        <ClientOnly>
          <button class="btn btn--primary" @click="setModalState('shareModal', true)">
            <nuxt-icon name="ui/share" />
            Share
          </button>
        </ClientOnly>
      </div>
    </section>
    <div class="product-panel__skeleton mask" v-if="pending"></div>
  </div>
</template>

<script setup>
import {useGlobalCart, addToCart} from "~/composables/cartState";
import {setModalState} from "~/composables/globalState";
import {useProductInfo} from "~/composables/catalogState";

const props = defineProps(['pending'])

const PRODUCT_INFO = useProductInfo()
const globalCart = useGlobalCart()

const inCart = computed(()=>{
  return globalCart.value?.products?.find((el) => el.id === PRODUCT_INFO?.value?.id)?.count || 0
})

const toCart = (id,minus = undefined) => {
  addToCart(id,minus)
  if (!minus && inCart.value < 1) setModalState('productCartModal',true)
}
</script>

<style lang="stylus">
  .product-panel
    background #fff
    width 100%
    padding 16px
    box-shadow 0 10px 30px 0 rgba(0, 0, 0, 0.05)
    border-radius 4px
    margin-top 32px
    gap 16px
    @media (max-width: 768px)
      border-radius 0
      width 100vw
      margin-left -16px
      flex-direction column
      align-items flex-end
    &__skeleton
      background white
      width 100%
      height 112px
      border-radius 4px
      margin-top 32px
      @media (max-width: 768px)
        border-radius 0
        width 100vw
        margin-left -16px
    &__price
      flex-shrink 0
      gap 12px
      justify-content center
      align-items center
      &-old
        color var(--text-gray)
        position relative
        span
          font-size 8px
          line-height 14px
        &::after
          content ''
          display block
          width 100%
          height 1px
          background var(--text-base)
          position absolute
          top 50%
          left 0
      &-current
        span
          font-size 10px
          line-height 14px
          font-weight 600
      &-save
        margin-top 2px
        color #333
    &__buttons
      width 100%
      display flex
      justify-content right
      gap 4px
    &__btn--main
      flex 1
      @media (max-width: 1199px)
        max-width 250px
      @media (max-width: 450px)
        max-width 100%
    &__outOfStock
      background var(--bg-gray)
      border-color var(--border-gray)
    &__counter
      gap 8px
      justify-content right
      button
        width 40px !important
        flex-shrink 0
        padding 18px
      &-value
        min-width 40px
        flex 1
        background var(--bg-gray)
        border 1px solid var(--border-gray)
        border-radius 4px
</style>