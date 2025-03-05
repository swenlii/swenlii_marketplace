<template>
  <section class="orders-skeleton">

    <div class="orders-head">
      <div class="mask hidden-desktop"></div>
      <div class="mask"></div>
    </div>

    <div>
      <div class="orders__order" v-for="idx in 3" :key="idx">

        <div class="orders__top d-flex justify-between">
          <div>
            <div class="mask mask1"></div>
            <div class="mask mask2"></div>
          </div>
          <div class="orders__delivery">
            <div class="mask mask3"></div>
            <div class="mask mask4"></div>
          </div>
          <div class="mask7">
            <div class="mask mask5"></div>
            <div class="mask mask6"></div>
          </div>
        </div>

        <div class="orders__items d-flex">
          <div class="mask mask-img orders__item"></div>
          <div class="mask mask-img orders__item"></div>
          <div class="mask mask-img orders__item"></div>
        </div>

      </div>
    </div>

  </section>
</template>

<style lang="stylus">
.orders-head
  .mask:nth-child(1)
    width 40px
    height 14px
    margin-bottom 8px
  .mask:nth-child(2)
    width 300px
    height 40px
    margin 0 0 32px 0
    @media (max-width: 767px)
      height 29px

.orders-skeleton
  flex 1

  .mask.mask1
    width 160px
    height 22px
    margin-bottom 4px

  .mask.mask2
    width 208px
    height 15px

  .mask.mask3
    width 116px
    height 14px
    margin-bottom 6px

  .mask.mask4
    width 80px
    height 15px

  .mask7
    display flex
    flex-direction column
    align-items flex-end

  .mask.mask5
    width 30px
    height 15px
    margin-bottom 4px

  .mask.mask6
    width 72px
    height 22px

  .mask-img
    width 80px
    height 80px
</style>