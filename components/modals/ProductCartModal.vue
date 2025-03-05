<template>
  <!-- Открывается, если добавить продукт в корзину -->
  <Modal :open="modalState?.productCartModal" :name="'productCartModal'" :minimized="true" >
    <div class="product-cart__wrap" v-if="PRODUCT_INFO.title">
      <h2 class="product-cart__title">Added to Cart</h2>

      <div class="product-cart__product">

        <div class="product-cart__image">
          <img :src="PRODUCT_INFO.images_s3_url[0]" :alt="PRODUCT_INFO.title"/>
        </div>

        <div class="product-cart__info flex-column">
          <p class="product-cart__name t-text--m">{{ PRODUCT_INFO.title }}</p>
          <div class="product-cart__price ">
            <div class="product-cart__price-old d-flex align-center" v-if="+PRODUCT_INFO.discount">
              <s class="d-flex align-center t-ui--s color-gray" aria-hidden="true">
                {{ (isInCart * PRODUCT_INFO.oldPrice / 100 | 0) }}
                <span>.<template v-if="PRODUCT_INFO.oldPrice%100 < 10">0</template>{{PRODUCT_INFO.oldPrice % 100}}</span>
                $
              </s>
            </div>
            <div class="product-cart__price-new d-flex t-title--l">
              {{ (isInCart * PRODUCT_INFO.price / 100 | 0) }}
              <span>.<template v-if="PRODUCT_INFO.price%100 < 10">0</template>{{ PRODUCT_INFO.price % 100 }}</span>
              $
            </div>
          </div>
        </div>

        <div class="product-cart__actions">
          <div class="product-cart__counter d-flex align-center">
            <button class="btn btn--black"
                    :class="{'btn--disabled': (isInCart < 2)}"
                    @click="addToCart(PRODUCT_INFO.id,true)"
                    aria-label="Delete one">
              <nuxt-icon name="ui/minus"/>
            </button>
            <div class="product-cart__counter-value t-title--l">
              {{ isInCart }}
            </div>
            <button class="btn btn--black"
                    :class="{'btn--disabled': (+PRODUCT_INFO.rest <= isInCart)}"
                    @click="addToCart(PRODUCT_INFO.id)"
                    aria-label="Add one">
              <nuxt-icon name="ui/plus"/>
            </button>
          </div>

          <button @click="delProduct(PRODUCT_INFO.id)">
            <nuxt-icon name="ui/cart-del" filled/>
            Remove
          </button>
        </div>
      </div>

      <div class="product-cart__btns d-flex justify-between">
        <button @click="setModalState('productCartModal',false)" class="btn btn--black">
          Continue Shopping
        </button>
        <NuxtLink @click="setModalState('productCartModal',false)" :to="'/cart'" class="btn btn--primary">
          Go to Cart
        </NuxtLink>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import {useGlobalCart, addToCart, deleteFromCart, getGlobalCart} from "~/composables/cartState";
import {useModalState, setModalState} from "~/composables/globalState"
import {useProductInfo} from "~/composables/catalogState"

const modalState = useModalState()
const PRODUCT_INFO = useProductInfo()
const globalCart = useGlobalCart()

const isInCart = computed(() => {
  return +globalCart.value?.products?.find((el) => el.id === PRODUCT_INFO?.value?.id)?.count || 0
})

const delProduct = async (id) => {
  await deleteFromCart(id)
  await getGlobalCart()
  setModalState('productCartModal', false)
}

</script>

<style lang="stylus">
.product-cart
  &__wrap
    padding 24px
    background var(--bg-gray)
    @media (max-width: 767px)
      padding 16px

  &__title
    font-size 32px
    font-weight 900
    letter-spacing 1px
    @media (max-width: 767px)
      font-size 26px

  &__product
    display flex
    margin-top 30px
    margin-bottom 30px
    gap 12px
    @media (max-width: 767px)
      flex-wrap wrap

  &__image
    display flex
    background white
    border-radius 4px

    img, picture
      width 100px
      height 100px
      object-fit contain
      @media (max-width: 767px)
        width 80px
        height 80px

  &__info
    width 320px
    justify-content space-between
    @media (max-width: 767px)
      width calc(100% - 92px)

  &__name
    font-size 13px
    line-height 14px

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

  &__actions
    display flex
    justify-content space-between
    flex-direction column
    align-items flex-end
    @media (max-width: 767px)
      width 100%
      flex-direction row
      align-items center

    button
      font-weight 600
      font-size 12px
      display flex
      gap 4px
      .nuxt-icon path
        stroke var(--text-base)

  &__counter
    .btn
      padding 6px 8px
      height 32px
    &-value
      width 32px
      text-align center

  &__btns
    gap 12px
    .btn
      flex 1
</style>
