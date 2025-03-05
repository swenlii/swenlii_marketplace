<template>
  <div class="header" id="header">

    <div class="header__block">
      <div class="d-flex align-center">
        <NuxtLink to="/" class="header__logo">
          Marketplace
        </NuxtLink>
      </div>

      <div class="d-flex">
        <HeaderIcons/>
        <NuxtLink to="/catalog" class="header__catalog btn btn--black hidden-mobile hidden-tablet">
          Catalog
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.header
  background white
  color #333
  padding 32px 0
  @media (max-width: 1199px)
    padding 16px 0
  .profile-menu__social
    margin-top 0
  &__logo
    font-size 22px
    letter-spacing 1px
    font-weight 900
    text-transform uppercase
    margin-right 12px
  &__block
    max-width 1110px
    margin 0 auto
    display flex
    justify-content space-between
    align-items center
    gap 32px
    @media (max-width: 1199px)
      flex-direction column
      gap 16px
  &__logo svg
    width 32px !important
    height 32px !important
    path
      fill #333
  &__catalog
    padding 0 32px
    height 42px
    font-size 13px
    letter-spacing 1px
    font-weight 600
    text-transform uppercase
    @media (max-width: 767px)
      padding 0 16px
      font-size 11px

</style>