<template>
  <div class="gallery-modal" v-if="modalState?.productGallery">
    <ProductGallery :is-modal="true"/>
    <button class="gallery-modal__close d-flex align-center justify-center absolute"
            @click="setModalState('productGallery', false)">
      <nuxt-icon name="ui/x"/>
    </button>
  </div>
</template>

<script setup>
  import {setModalState, useModalState} from "~/composables/globalState";
  const modalState = useModalState()

  // Дизейблим скролл страницы при открывании модалки
  onMounted(() => {
    document.querySelector('body').style.removeProperty('position')
    if (modalState?.value?.productGallery) {
      document.querySelector('body').style.position = 'fixed'
    }
  })

  // Дизейблим скролл страницы при открытой модалке
  onUpdated(() => {
    document.querySelector('body').style.removeProperty('position')
    if (modalState?.value?.productGallery) {
      document.querySelector('body').style.position = 'fixed'
    }
  })

  // для случаев, если не отследили изменение модалки и ушли с экрана
  onUnmounted(() => {
    document.querySelector('body').style.removeProperty('position')
  })

</script>

<style lang="stylus">
  .gallery-modal
    position fixed
    align-items stretch
    background #fff
    z-index 99999
    top 0
    left 0
    width 100svw
    height 100svh
    pointer-events auto
    @media (max-width: 1199px)
      padding-top 64px
    &__close
      width 40px
      height 40px
      border-radius 4px
      color #fff
      background #333
      top 32px
      right 32px
      z-index 3
      @media (max-width: 1199px)
        top 16px
        right 16px
        width 32px
        height 32px
        background var(--bg-gray)
        color #000
        .nuxt-icon svg
          width 12px !important
          height 12px !important
    .product-gallery
      width 100%
      height 100%
      align-items stretch
      gap 0
      @media (max-width: 1199px)
        flex-direction column
        margin 0
      &__thumbs-wrap
        width 116px
        height 100%
        padding 32px
        @media (max-width: 1199px)
          width 100%
          height 84px
          display block
          padding 16px 0
      &__thumbs
        height 100%
        @media (max-width: 1199px)
          height 52px !important
          padding 0 8px 0 16px
          max-width 100svw
      &__main-image
        width calc(100% - 116px)
        height 100%
        cursor auto
        .swiper-slide
          background var(--bg-gray)
        img
          filter brightness(.95)
        @media (max-width: 1199px)
          width 100%
          height calc(100% - 84px)
          padding 0
      &__nav
        &--next
          right 32px
        &--prev
          left 32px
        button
          @media (max-width: 1199px)
            display none

</style>