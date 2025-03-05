<template>
    <section class="characteristics" v-if="!pending && PRODUCT_INFO?.id">
        <div class="product-page__accordion d-flex justify-between align-center">
          <h2 class="t-h--3">Characteristics</h2>
        </div>

        <div>

          <section class="characteristics__grid" aria-label="Characteristics"
               :class="{'active' : showMore}">
            <div class="characteristics__group" v-for="group in PRODUCT_INFO.characteristics">
              <h3 class="t-h--4" v-if="group.title?.length">{{ group.title }}</h3>
              <dl class="characteristics__item d-flex" :class="{'characteristics__item-detailed': group.title?.length < 1 }" v-for="item in group.items">
                <dt class="t-ui--s">{{ item.title }}{{group.title?.length < 1 ? ': ' : ''}}</dt>
                <dd class="t-text--s">
                  <span>{{ item.value }}</span>
                  <span>{{ item.unit }}</span></dd>
              </dl>
            </div>
          </section>

          <button class="characteristics__more t-ui--s"
                  :class="{active: showMore}"
                  @click="showMore = !showMore"
                  v-if="PRODUCT_INFO.characteristics.length > 2">
            {{ showMore ? 'Hide' : 'See more...' }}
          </button>
        </div>

    </section>

    <div class="characteristics__skeleton flex-column" v-if="pending">
      <div class="mask" v-for="i in 8" :key="i" :style="{width: Math.floor(Math.random() * 31) + 50 + '%'}"></div>
    </div>
</template>

<script setup>
import { useProductInfo } from "~/composables/catalogState";

const props = defineProps(['pending'])

const PRODUCT_INFO = useProductInfo()

const showMore = ref(false)
</script>

<style lang="stylus">
  .characteristics
    margin auto
    scroll-margin-top 110px
    background white
    padding 24px 32px 32px
    border-radius 4px
    @media (max-width: 1199px)
      margin-top -8px
    @media (max-width: 767px)
      padding 16px
      border-radius 0
      margin 0 -16px
    h2
     margin-bottom 27px
    h3
      margin 0 0 8px
    &__more
      margin-top 8px
    &__group
      display flex
      flex-direction column
      gap 9px
      @media (min-width: 1200px)
        &:nth-of-type(n+3)
          display none
      @media (max-width: 1199px)
        &:nth-of-type(n+2)
          display none
    &__item
      gap 8px
      dt
        order 1
        flex-shrink 0
        max-width 50%
        width max-content
      dd
        order 3
        max-width 300px
        width auto
        flex-shrink 0
        margin 0
        gap 3px
        text-align right
        @media (max-width: 1199px)
          width auto
          max-width 50%
          text-align right
      &::after
        order 2
        content ''
        display block
        width 100%
        height 1px
        border-bottom 1px dotted #333333
        position relative
        top 9px
      &-detailed
        display block
        padding-left 20px
        position relative
        &::after
          width 8px
          height 8px
          border none
          background #333
          border-radius 4px
          position absolute
          top 8px
          left 5px
        dt
          display inline
        dd
          display inline
          margin-top 18px
          max-width 100%
          text-align left
          line-height 22px

    &__grid
      display grid
      grid-gap 32px
      grid-template-columns 1fr 1fr
      @media (max-width: 1199px)
        grid-template-columns 1fr
      &.active
        .characteristics__group
          display flex
    &__skeleton
      gap 9px
      .mask
        background white
        height 15px
        &:first-child
          height 17px
          width 25% !important
</style>