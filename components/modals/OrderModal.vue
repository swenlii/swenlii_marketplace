<template>
  <Modal :open="modalState?.orderModal" :name="'orderModal'" class="order-modal__modal">
    <section class="order-modal" v-if="orderInfo">
      <h2 class="order-modal__title">Order #{{orderInfo.orderId}}</h2>

      <p class="order-modal__placed">Placed {{ dateToString(orderInfo.orderDate) }}</p>

      <div class="order-modal__blocks">
        <div class="order-modal__products">
          <h3>Products</h3>

          <p class="order-modal__products_items t-ui--s">{{orderInfo.deliveryInfo?.products_count}} item{{orderInfo.deliveryInfo?.products_count > 1 ? 's' : ''}}</p>

          <div class="order-modal__products_block">
            <div class="order-modal__product" v-for="product in orderInfo.orderProducts" :key="product.product_id">

              <NuxtLink class="order-modal__product-img" :to="'/product/' + product.url">
                <div><img :src="product.image" :alt="product.title"/></div>
                <span class="order-modal__product-discount" v-if="+product.discount">{{product.discount}}%</span>
              </NuxtLink>

              <div class="order-modal__product-info">

                <NuxtLink :to="'/product/' + product.url" class="t-ui--s">
                  {{product.title}}
                </NuxtLink>

                <div class="order-modal__product-countprice">
                  <div class="order-modal__product-price d-flex">

                    <div class="order-modal__product-price-new d-flex t-title--l">
                      {{ (product.price * product.count / 100 | 0) }}
                      <span>.<template v-if="(product.price * product.count)%100 < 10">0</template>{{ (product.price * product.count) % 100 }}</span>
                      $
                    </div>
                    <div class="order-modal__product-price-old d-flex align-center" v-if="+product.price_old - product.price > 0">
                      <s class="d-flex align-center t-ui--s color-gray" aria-hidden="true">
                        {{ (+product.price_old * product.count / 100 | 0) }}
                        <span>.<template v-if="+(product.price_old * product.count)%100 < 10">0</template>{{ (+product.price_old * product.count) % 100 }}</span>
                      </s>
                    </div>
                  </div>

                  <div class="order-modal__product-count t-ui--xs">
                    {{product.count}} item{{product.count > 1 ? 's' : ''}}
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="order-modal__info" v-if="orderInfo.deliveryInfo">
          <h3>Information</h3>

          <div class="order-modal__status">
            <div class="order-modal__status-title">
              <span class="order-modal__status-label"
                          :class="{
                            'order-modal__status--blue' : +orderInfo.orderStatus < 1,
                            'order-modal__status--yellow' : +orderInfo.orderStatus < 3 && +orderInfo.orderStatus > 0,
                            'order-modal__status--green' : +orderInfo.orderStatus > 2 && +orderInfo.orderStatus < 5,
                            'order-modal__status--red' : +orderInfo.orderStatus >= 4,
                          }"
                    ></span>
              {{ orderStatus['status' + orderInfo.orderStatus] }}
            </div>
            <p class="order-modal__status-text">{{orderInfo.deliveryInfo?.status_text}}</p>
          </div>

          <dl class="order-modal__info-numbs">

            <div>
              <dt class="t-ui--s">Products count</dt>
              <dd class="t-text--s">{{orderInfo.deliveryInfo?.products_count}} item{{orderInfo.deliveryInfo?.products_count > 1 ? 's' : ''}}</dd>
            </div>
            <div>
              <dt class="t-ui--s">Products cost</dt>
              <dd class="t-text--s">{{orderInfo.deliveryInfo?.products_sum / 100}} $</dd>
            </div>
            <div>
              <dt class="t-ui--s">Discount value</dt>
              <dd class="t-text--s">{{orderInfo.deliveryInfo?.discount / 100}} $</dd>
            </div>
            <div>
              <dt class="t-ui--s">Delivery sum</dt>
              <dd class="t-text--s">{{orderInfo.deliveryInfo?.delivery_sum / 100}} $</dd>
            </div>
            <div>
              <dt class="t-ui--s">Payment type</dt>
              <dd class="t-text--s">{{orderInfo.deliveryInfo?.payment_type ? 'by card' : 'cash'}}</dd>
            </div>

            <div class="order-modal__info--total">
              <div class="t-h--4">Total</div>
              <div class="t-h--4 order-modal__info--total_price">
                {{Math.floor(orderInfo.orderTotal / 100)}}
                <span class="t-ui--xs">
                  .<template v-if="orderInfo.orderTotal % 100 < 10">0</template>{{ orderInfo.orderTotal % 100 }}
                </span>
                $
              </div>
            </div>

          </dl>

        </div>

        <div class="order-modal__actions d-flex hidden-tablet hidden-desktop">
          <button class="btn btn--white" v-if="+orderInfo.orderStatus < 3" @click="setModalState('orderModal', false)">Cancel</button>
          <button class="btn btn--black" @click="setModalState('orderModal', false)">Close</button>
        </div>

      </div>

      <div class="order-modal__actions d-flex hidden-mobile">
        <button class="btn btn--white" v-if="+orderInfo.orderStatus < 3" @click="setModalState('orderModal', false)">Cancel</button>
        <button class="btn btn--black" @click="setModalState('orderModal', false)">Close</button>
      </div>

    </section>
  </Modal>
</template>

<script setup>
  import {useModalState, setModalState, useOrderInfo} from "~/composables/globalState"
  import {dateToString} from "~/utils/dateToString";
  const modalState = useModalState()
  const orderInfo = useOrderInfo()

  let orderStatus = ref({
    status0: "New",
    status1: "Registered",
    status2: "Delivering",
    status3: "Delivered",
    status4: "Cancelled",
    status5: "Returning",
    status6: "Returned",
    status7: "Courier assigned"
  })

</script>

<style lang="stylus">
.order-modal
  padding 24px
  display flex
  flex-direction column
  align-items center
  justify-content center
  background var(--bg-gray)
  gap 16px
  @media (max-width: 1199px)
    gap 12px
    padding 16px
  @media (max-width: 767px)
    align-items flex-start
    padding 0
  &__modal .modal
    @media (max-width: 767px)
      max-height calc(100vh - 110px)
  &__title
    font-size 32px
    line-height 42px
    @media (max-width: 1199px)
      font-size 24px
      line-height 34px
    @media (max-width: 767px)
      padding 0 12px
      margin-top 16px
  &__placed
    color var(--text-gray)
    margin-top -10px
    @media (max-width: 767px)
      padding 0 12px
  &__blocks
    display flex
    gap 12px
    @media (max-width: 1199px)
      gap 8px
    @media (max-width: 767px)
      flex-direction column
      overflow-y auto
      max-height calc(100vh - 192px)
      width 100%
  &__products
    background white
    padding 12px
    border-radius 4px
    width 600px
    height max-content
    @media (max-width: 1199px)
      padding 8px
      width 350px
    @media (max-width: 767px)
      width 100%
      border-radius 0
    h3
      font-size 24px
      margin-top 4px
      margin-left 4px
      @media (max-width: 1199px)
        font-size 18px

    &_items
      color var(--text-gray)
      margin-top 4px
      margin-left 4px
    &_block
      margin-top 16px
      max-height 350px
      overflow-y auto
      padding 4px
      @media (max-width: 1199px)
        max-height 225px
      @media (max-width: 767px)
        overflow-y visible
        max-height max-content

  &__product
    display flex
    margin-bottom 12px
    &-img
      width 80px
      height 80px
      display block
      position relative
      @media (max-width: 1199px)
        width 60px
        height 60px
      div
        overflow hidden
        background var(--bg-gray)
        border-radius 4px
      img
        width 80px
        height 80px
        object-fit contain
        filter brightness(0.95)
        @media (max-width: 1199px)
          width 60px
          height 60px
    &-discount
      position absolute
      background #333
      color white
      padding 4px 8px
      top -4px
      left -4px
      border-radius 4px
      font-size 10px
      font-weight 700

    &-info
      display flex
      flex-direction column
      justify-content space-between
      width 100%
      margin-left 16px
    &-countprice
      display flex
      justify-content space-between
      width 100%
    &-count
      color var(--text-gray)
    &-price
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
  &__info
    h3
      font-size 24px
      @media (max-width: 1199px)
        font-size 18px
    background white
    padding 16px 32px 32px
    border-radius 4px
    width 300px
    max-height 352px
    @media (max-width: 1199px)
      padding 8px 16px 16px
      width 230px
    @media (max-width: 767px)
      border-radius 0
      width 100%
    &-numbs
      display flex
      flex-direction column
      gap 10px
      & > div
        display flex
        justify-content space-between
        position relative

      dt, dd
        background white
        z-index 2
      dt
        padding-right 4px
      dd
        padding-left 4px

      & > div:before
        content ""
        width 100%
        position absolute
        bottom 2px
        left 0
        border-bottom 1px dotted #333
        z-index 1
    &--total
      margin-top 8px
      padding-top 16px
      border-top 1px solid #333
      @media (max-width: 1199px)
        margin-top 4px
        padding-top 8px
        & > div
          font-size 15px
      &:before
        content none !important
      &_price
        display flex
        align-items flex-start
        span
          margin-top 2px

  &__status
    border 1px solid #333
    padding 8px 12px
    border-radius 4px
    margin-top 16px
    margin-bottom 16px
    background #333
    color white
    min-width 100%
    @media (max-width: 1199px)
      margin-top 12px
      margin-bottom 12px
    &-title
      font-weight 700
      font-size 16px
      display flex
      align-items center
      gap 8px
      @media (max-width: 1199px)
        font-size 12px
        gap 4px
    &-text
      font-weight 400
      font-size 12px
      margin-top 4px
      @media (max-width: 1199px)
        font-size 10px
    &-label
      display block
      height 10px
      width 10px
      border-radius 5px
      border 1px solid white
    &--blue
      background #0dffff
    &--yellow
      background #fffb9c
    &--green
      background #93e593
    &--red
      background #f54545
  &__actions
    display flex
    gap 12px
    @media (max-width: 767px)
      padding 12px
      background white
      margin-top -12px
      button
        flex 1

</style>