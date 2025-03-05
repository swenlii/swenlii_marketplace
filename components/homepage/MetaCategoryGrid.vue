<template>
  <div>
    <div class="home-section__head d-flex justify-between" v-if="header.title">
      <NuxtLink :to="header.link">
        <h2 class="category-grid__head t-h--1">{{ header.title }}</h2>
      </NuxtLink>
      <NuxtLink :to="header.link" class="home-section__link d-flex align-center t-ui--m">
        See more
        <nuxt-icon name="ui/arrow" class="hidden-mobile"/>
        <nuxt-icon name="ui/breadcrumbs" class="hidden-tablet hidden-desktop"/>
      </NuxtLink>
    </div>
    <div class="category-grid flex-column">
      <div class="category-grid__row" v-for="(row,index) in categoriesGrid" :key="index">
        <template v-for="item in row">
          <NuxtLink class="category-grid__item d-flex"
                    :to="item.url">
            <div class="category-grid__title">{{ item.title }}</div>
            <div class="category-grid__more t-ui--s">
              <nuxt-icon name="ui/breadcrumbs" class="hidden-mobile"/>
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>
    <HomeProducts v-if="category_id"
                  api-url="/get-products/category"
                  :id="category_id"
                  idVar="category_id"
                  :limit="6"
                  :index="id"
    />
  </div>
</template>

<script setup>
  import { useCatalogTree } from "~/composables/catalogState"
  const props = defineProps(['grid','id'])
  const catalogTree = useCatalogTree()
  let category_id = ref('')

  const categoriesGrid = computed(() => {
    if (!catalogTree?.value) return []

    let categories = []

    if (props.id) {
      // Копируем полностью, чтоб не нарушался порядок в главном дереве
      let tree = JSON.parse(JSON.stringify(catalogTree.value))

      let meta = tree.find((e) => e.id === props.id || e.title === props.id)
      categories = meta?.children || []

      // Сохраняем id для запроса продуктов
      category_id.value = meta?.id
    }

    if (!categories.length) return []

    let result = []

    // Нарезаем
    for (let i of props.grid) {
      if (categories.slice(0,i).length) result.push(categories.slice(0,i))
      categories = categories.slice(i)
    }

    return result
  })

  const header = computed(() => {
    let title = ''
    let link = ''

    if (catalogTree?.value) {
      let tree = JSON.parse(JSON.stringify(catalogTree.value))
      let categories = tree.find((e) => e.id === props.id || e.title === props.id)
      title = categories?.title
      link = categories?.url
    }

    return {
      title: title,
      link: link
    }
  })

</script>

<style lang="stylus">
  .category-grid
    gap 24px
    &__head
      letter-spacing 1px
    + .home-products
      margin-top 32px
    @media (max-width: 1199px)
      gap 8px
    &__row
      display grid
      grid-auto-columns 1fr
      grid-auto-flow column
      grid-gap 24px
      width 100%
      @media (max-width: 1199px)
        grid-gap 8px
      @media (max-width: 767px)
        a:nth-child(n + 3)
          display none
    &__item
      background #333
      color white
      padding 12px 18px
      border-radius 4px
      position relative
      overflow hidden
      justify-content space-between
      align-items center
      svg
        width 20px !important
      @media (max-width: 1199px)
        padding 12px 8px
    &__title
      max-width calc(100% - 70px)
      position relative
      font-weight 600
      z-index 2
      font-size 20px
      display flex
      gap 8px
      align-items center
      @media (max-width: 1199px)
        font-size 12px
        font-weight 600
        line-height 14px
        max-width 100%
    &__more
      display flex
      gap 4px
      margin-right 5px
      animation-name arrowFly
      animation-duration 3s
      animation-iteration-count infinite
      animation-timing-function linear
    &__icon
      position absolute
      bottom 0
      right 0
      width 160px
      height 160px
      display flex
      @media (max-width: 1199px)
        width 60px
        height 60px
      img
        width 100%
        height 100%
        object-fit contain



</style>
