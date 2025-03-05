<template>
  <section class="seller-profile" aria-label="About us" v-if="sellerInfo?.seller">
    <!-- about text -->
    <div v-if="sellerInfo?.seller.seller_description">
      <h2 class="seller-profile__title t-h--2">About us</h2>
      <p class="t-text--s">{{ sellerInfo.seller.seller_description }}</p>
    </div>

    <div class="seller-profile__block">
      <div class="seller-profile__logo d-flex">
        <img :src="sellerInfo.seller.seller_image_s3_url" :alt="sellerInfo?.seller?.seller_legal_name"/>
      </div>
      <!-- seller details table -->
      <div v-if="sellerInfo.seller.seller_legal_name">
        <h2 class="seller-profile__title t-h--2">Description</h2>
        <!-- Якобы описание (в API нет) -->
        <p class="seller-profile__desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Etiam vestibulum velit sed lacus lobortis, sed mattis augue gravida.
          Integer et ullamcorper nibh, ut dapibus risus.
          Nam neque nisi, bibendum et gravida id, venenatis eget quam.
          Donec consectetur, nisl facilisis rutrum malesuada,
          felis mauris mattis arcu, eget viverra mi neque ac velit.
          Duis eget venenatis nunc. Nam sed convallis nisi.
          Fusce accumsan felis leo, consequat posuere ipsum fermentum eget.
        </p>
        <h2 class="seller-profile__title t-h--2">Business details</h2>
        <dl>
          <div class="d-flex seller-profile__detail">
            <dt class="t-ui--s seller-profile__detail-name">Business name:</dt>
            <dd class="t-text--s seller-profile__detail-val">{{ sellerInfo.seller.seller_legal_name }}</dd>
          </div>
          <div class="d-flex seller-profile__detail" v-if="sellerInfo.seller.seller_license">
            <dt class="t-ui--s seller-profile__detail-name">License number:</dt>
            <dd class="t-text--s seller-profile__detail-val">{{ sellerInfo.seller.seller_license }}</dd>
          </div>
          <div class="d-flex seller-profile__detail">
            <dt class="t-ui--s seller-profile__detail-name">On the marketplace since:</dt>
            <dd class="t-text--s seller-profile__detail-val">21 Oct. 2023</dd>
          </div>
          <div class="d-flex seller-profile__detail">
            <dt class="t-ui--s seller-profile__detail-name">Work time:</dt>
            <dd class="t-text--s seller-profile__detail-val">10 a.m. - 11 p. m.</dd>
          </div>
          <div class="d-flex seller-profile__detail">
            <dt class="t-ui--s seller-profile__detail-name">Minimum sale sum:</dt>
            <dd class="t-text--s seller-profile__detail-val">{{sellerInfo.seller.seller_minimum_sale_sum}}</dd>
          </div>
        </dl>
        <p class="t-ui--s seller-profile__warn">Published as submitted by the seller</p>
      </div>
    </div>

  </section>
</template>

<script setup>
  import {useCatalogInfo} from "~/composables/catalogState"
  const sellerInfo = useCatalogInfo()
</script>

<style lang="stylus">
  .seller-profile
    &__block
      display flex
      gap 16px
      @media (max-width: 767px)
        flex-direction column
    &__title
      margin-bottom 16px
      @media (max-width: 1199px)
        font-size 18px
        line-height 22px
    &__desc
      margin-bottom 32px
    &__detail
      margin-bottom 8px
      @media (max-width: 767px)
        margin-top 16px
      &-name
        color var(--text-gray)
        width 272px
        max-width 272px
        white-space nowrap
        @media (max-width: 1199px)
          width 180px
        @media (max-width: 767px)
          width 50%
          white-space inherit
      &-val
        width 272px
        max-width 272px
        @media (max-width: 1199px)
          width 180px
        @media (max-width: 767px)
          word-break break-all
          width 60%
    &__warn
      color var(--text-gray)
      margin-top 32px
    &__logo
      width 300px
      min-width 300px
      height 300px
      border-radius 4px
      border 1px solid #333
      overflow hidden
      @media (max-width: 1199px)
        width 200px
        min-width 200px
        height 200px
      @media (max-width: 767px)
        width 300px
        min-width 0
        height max-content
        max-width 100%
      img
        width 300px
        height 300px
        @media (max-width: 1199px)
          width 200px
          height 200px
        @media (max-width: 767px)
          width 300px
          height max-content
          max-width 100%
</style>