<template>
  <main>
    <div class="container profile">
      <aside class="profile__sidebar">
        <profile-sidebar/>
      </aside>

      <section class="profile__content" v-if="!pending || test_data">
        <div class="orders-head">
          <BreadCrumbs />
          <h1 class="t-h--1">
            Orders
          </h1>
        </div>

        <div class="profile__orders">
          <!-- Нет заказов -->
          <div class="empty-catalog d-flex justify-between align-center" v-if="!orders || !orders.length">
            <div class="empty-catalog__text">
              <h2>Nothing here</h2>
              <p>Try to return to catalog and place a new order</p>
            </div>
            <NuxtLink :to="'/'" class="btn btn--primary">Return</NuxtLink>
          </div>
          <!-- Список заказов -->
          <div class="orders" v-else>
            <section class="orders__order" v-for="(order,index) in orders" :key="index"
                     :aria-label="'Order #' + order.orderId">
              <button @click="openOrder(order.orderId)" class="orders__top d-flex justify-between">

                <!-- title и дата заказа -->
                <div class="orders__info">
                  <h2 class="t-h--3">{{'Order #' + order.orderId}}</h2>

                  <p>Placed {{ dateToString(order.orderDate) }}</p>
                </div>

                <!-- Статус заказа -->
                <div class="orders__delivery">
                  <div class="orders__curier t-ui--s">Status</div>
                  <div class="orders__status d-flex align-center">
                    <span class="orders__status-label"
                          :class="{
                            'orders__status-label--blue' : +order.orderStatus < 1,
                            'orders__status-label--yellow' : +order.orderStatus < 3 && +order.orderStatus > 0,
                            'orders__status-label--green' : +order.orderStatus > 2 && +order.orderStatus < 5,
                            'orders__status-label--red' : +order.orderStatus >= 4,
                          }"
                    ></span>
                    {{ orderStatus['status' + order.orderStatus] }}
                  </div>
                </div>

                <!-- Итого -->
                <div class="orders__total">
                  <dl>
                    <dt class="t-text--s">Total</dt>
                    <dd class="orders__price d-flex align-start">
                      {{ Math.floor(order.orderTotal / 100).toLocaleString() }}
                      <span class="t-ui--xxs">
                        .{{ (order.orderTotal).toLocaleString().slice(-2) }}
                      </span>
                      <span style="margin-left: 2px">$</span>
                    </dd>
                  </dl>
                </div>
              </button>

              <!-- Список продуктов -->
              <ul class="orders__items d-flex" aria-label="Products">
                <li v-for="product in order.orderProducts.slice(0,9)" :key="product.product_id"
                    class="orders__item d-flex align-center justify-center">
                  <NuxtLink :to="'/product/' + product.url">
                    <img :src="product.image" :alt="product.title"/>
                  </NuxtLink>
                </li>
                <li class="orders__item more align-center justify-center flex-column"
                    v-if="order.orderProducts.length > 9">
                  <span>+{{ order.orderProducts.length - 9 }}</span>
                  <span>more items</span>
                </li>
              </ul>
            </section>
          </div>

          <Pagination v-if="total"
                        :total-pages="Math.ceil((total ? total : orders?.length) / limit)"
                        :loading="pending && loadMore"
            />
        </div>

      </section>

      <OrdersSkeleton v-else/>
    </div>
  </main>
</template>

<script setup>
import {useBreadCrumbs} from "~/composables/catalogState";
import {dateToString} from "~/utils/dateToString";
import {getOrdersList} from "~/utils/getOrdersList";
import {setModalState, useOrderInfo} from "~/composables/globalState"

const props = defineProps(['test_data'])
const route = useRoute()

const breadcrumbs = useBreadCrumbs()
const orderInfo = useOrderInfo()

let orders = ref([])
let skeleton = ref(true)
let limit = ref(8)
let loadMore = ref(false)
let total = ref(0)
let pending = ref(true)
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

breadcrumbs.value = [{"langTitle":"Home","url":"/"}]

const openOrder = (order_id) => {
  orderInfo.value = orders.value.find((order) => {return order.orderId === order_id})
  setModalState('orderModal', true)
}

const getOrders = () => {
  pending.value = true
  setTimeout(() => pending.value = false, 400)

  let response = getOrdersList()
  orders.value = loadMore.value ? [...orders.value, ...response.order_list] : response.order_list
  skeleton.value = false
  total = response.total
  setSeo()
}

// Слушаем, когда нажали на Load More
const { $listen } = useNuxtApp()
$listen('loadMore', (status) => {
  loadMore.value = status
})

const setSeo = () => {
  let meta_title = route?.query?.page ? `Orders - page ${route?.query?.page} | Marketplace` : 'Orders | Marketplace'

  useSeoMeta({
    title: meta_title,
    ogTitle: meta_title,
    twitterTitle: meta_title,
    description: meta_title,
    ogDescription: meta_title,
    twitterDescription: meta_title
  })
}

onMounted(() => {
  if (props.test_data) orders.value = props.test_data.order_list
  getOrders()
})
</script>

<style lang="stylus">
.orders
  &-head
    margin-bottom 32px
    h1
      font-size 44px
      @media (max-width: 1199px)
        font-size 32px
  &__order
    margin-bottom 16px
    background #FFFFFF
    box-shadow 0px 10px 30px rgba(0, 0, 0, 0.05)
    padding 16px
    border-radius 4px
    @media (max-width: 1199px)
      margin-bottom 24px
    @media (max-width: 767px)
      margin-left -16px
      margin-right -16px
      margin-bottom 8px

  &__top
    width 100%
    padding-bottom 12px
    border-bottom 1px solid #F3F3F5
    @media (max-width: 767px)
      flex-wrap wrap

  &__info
    @media (max-width: 767px)
      order 1

    h2
      margin 0 0 4px
      @media (max-width: 767px)
        font-size 18px

    p
      font-weight 500
      font-size 12px
      line-height 15px
      color var(--text-gray)
      margin 0
      text-align left
      @media (max-width: 767px)
        font-size 10px
        font-weight 600

  &__delivery
    display flex
    flex-direction column
    align-items end
    justify-content center
    @media (max-width: 767px)
      order 3
      width 100%
      flex-direction row
      align-items center
      justify-content start
      gap 8px
      margin-top 4px

    h3
      font-weight 600
      font-size 12px
      line-height 14px
      margin 0 0 6px
      @media (max-width: 767px)
        font-size 10px
        margin 0

  &__curier
    margin-bottom 6px
    @media (max-width: 767px)
      margin-bottom 0

  &__status
    font-weight 500
    font-size 12px
    line-height 15px
    @media (max-width: 767px)
      font-weight 600
      font-size 10px

    &-label
      margin-right 4px
      width 14px
      height 14px
      border-radius 50%

      &--blue
        background #0dffff

      &--yellow
        background #fffb9c

      &--green
        background #93e593

      &--red
        background #f54545

  &__total
    min-width 100px
    text-align right
    @media (max-width: 767px)
      order 2
      min-width 0
    dt
      color var(--text-gray)
      margin 0 0 4px

  &__price
    font-weight 700
    font-size 18px
    line-height 22px
    justify-content right
    @media (max-width: 1199px)
      font-size 14px

  &__items
    margin-top 12px
    @media (max-width: 926px)
      overflow-x scroll

  &__item
    margin-right 8px
    &.more
      min-width 80px
    &:last-child
      margin-right 0
    a
      width 80px
      height 80px
      display flex
      background var(--bg-gray)
      overflow hidden

    img, picture
      object-fit contain
      width 100%
      height 100%

    img
      filter brightness(0.95)

    span
      font-weight 700
      font-size 18px
      line-height 22px
      color var(--text-gray)

      &:last-child
        font-weight 400
        font-size 12px
        line-height 15px


</style>
