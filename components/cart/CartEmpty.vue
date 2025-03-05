<template>
  <div class="empty-cart flex-column align-center justify-center">
    <div class="empty-cart__text flex-column align-center justify-center">
      <h1 class="t-h--1">Cart is empty</h1>
      <p class="t-text--m">
        Go to catalog and find something interesting</p>
      <NuxtLink :to="'/catalog'" class="btn btn--primary">
        Catalog
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="stylus">
.empty-cart
  height calc(100vh - 238px)

  &__text
    h1
      margin 0 0 16px
      @media (max-width: 767px)
        font-size 28px

    p
      margin 0 0 16px

    .btn
      @media (max-width: 767px)
        width 100%
        justify-content center
</style>