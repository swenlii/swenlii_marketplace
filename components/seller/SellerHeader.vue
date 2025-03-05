<template>
  <div class="seller-header" :class="{'mask' : !sellerInfo?.seller}">
    <div class="seller-header__bottom d-flex justify-between" v-if="sellerInfo?.seller">
      <div class="seller-header__main align-center d-flex">
        <div class="seller-header__logo d-flex" v-if="sellerInfo">
          <img :src="sellerInfo.seller.seller_image_s3_url" :alt="sellerInfo?.seller?.seller_legal_name"/>
        </div>

        <div class="seller-header__info flex-column align-start">
          <!-- Всегда премиум (так как в API нет такой инфы)-->
          <div class="seller-header__premium d-flex align-center t-ui--xs">
            <nuxt-icon name="ui/premium"/>
            Premium seller
          </div>
          <h1 class="t-h--4">{{ sellerInfo?.seller?.seller_title }}</h1>
        </div>
      </div>

      <div class="seller-header__actions d-flex">
        <button class="btn" @click="setModalState('shareModal', true)">
          <nuxt-icon name="ui/share"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {useCatalogInfo} from "~/composables/catalogState";
  import {setModalState} from "~/composables/globalState";

  const sellerInfo = useCatalogInfo()

  onUnmounted(() => {
    sellerInfo.value = null
  })

</script>

<style lang="stylus">
  .seller-header
    margin-bottom 8px
    background #333
    color white
    border-radius 4px
    overflow hidden
    padding 16px
    @media (max-width: 1199px)
      margin-bottom 0
      width calc(100% + 32px)
      margin-left -16px
      border-radius 0
      &__actions
        position absolute
        top 0
        right 0
        .btn
          background #fff
          border none
    &.mask
      height 116px
    &__bottom
      @media (max-width: 1199px)
        flex-direction column
        position relative
    &__main
      gap 16px
      @media (max-width: 1199px)
        flex-direction column
        align-items flex-start
        gap 0
    &__logo
      min-width 84px
      height 84px
      border-radius 4px
      overflow hidden
      background #fff
      @media (max-width: 1199px)
        margin-bottom 20px
      @media (max-width: 767px)
        width 60px
        height 60px
        border-radius 4px
      img
        width 84px
        height 84px
        object-fit contain
    &__info
      gap 8px
      h1
        font-size 40px
        line-height 50px
        @media (max-width: 767px)
          font-size 28px
          line-height 36px
    &__premium
      background linear-gradient(to right, #a2682a 0%, #be8c3c 8%, #be8c3c 18%, #d3b15f 27%, #faf0a0 35%, #ffffc2 40%, #faf0a0 50%, #d3b15f 58%, #be8c3c 67%, #b17b32 77%, #bb8332 83%, #d4a245 88%, #e1b453 93%, #a4692a 100%)
      color var(--text-base)
      gap 4px
      padding 4px 8px
      border-radius 4px
    &__icons
      gap 12px
      > span
        display block
        width 1px
        height 10px
        background var(--text-base)
        opacity .6
    &__icon
      gap 4px
    &__actions
      gap 8px
      .btn
        padding 16px 12px
        &:hover
          background #3f3f3f
          @media (max-width: 1199px)
            background #e7e7e7
        @media (max-width: 1199px)
          color var(--text-base)
        svg
          width 16px !important
          height 16px !important
</style>