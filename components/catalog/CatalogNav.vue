<template>
  <div class="catalog-nav">
    <h2 class="catalog-nav__head t-h--4">Categories:</h2>
    <ul class="catalog-nav__list" aria-label="Subcategories">
      <li v-for="(category, idx) in catalog" :key="category.url">
        <div class="catalog-nav__list-item d-flex">
          <button class="catalog-nav__list-btn" :class="{'active': active.includes(idx)}" v-if="category?.children?.length" @click="openSublist(idx)">
            <nuxt-icon :name="'ui/dropdown'"/>
          </button>
          <nuxt-icon class="catalog-nav__list-icon" v-else :name="'ui/dropdown'"/>
          <NuxtLink :class="{'without-btn': !category?.children?.length}" class="t-ui--s" :to="category.url">{{category.title}}</NuxtLink>
        </div>
        <template v-if="category?.children?.length">
          <ul class="catalog-nav__sublist" v-if="active.includes(idx)">
            <li class="catalog-nav__sublist-item t-ui--xs" v-for="subcategory in category?.children" :key="subcategory.url">
              <NuxtLink :to="subcategory.url">{{subcategory.title}}</NuxtLink>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
  const props = defineProps(['catalog'])

  let active = ref([])

  let openSublist = (idx) => {
    if (active.value.includes(idx)) active.value.splice(active.value.indexOf(idx), 1)
    else active.value.push(idx)
  }
</script>

<style lang="stylus">
.catalog-nav
  &__head
    margin-bottom 12px
  &__list
    margin-top 2px
    margin-left 6px
    a:hover
      text-decoration underline
    &-item
      display flex
      align-items top
      margin-top 8px
      margin-bottom 2px
    &-btn
      padding 3px
      height max-content
      background #333
      color #fff
      border-radius 3px
      display flex
      justify-content center
      align-items center
      margin-right 6px
      &.active
        svg
          transform rotate(0deg)
      svg
        width 9px !important
        height 9px !important
        transform rotate(-90deg)
        transition transform 0.3s ease
    &-icon
      transform rotate(-90deg)
      padding 3px
      height max-content
      margin-right 6px
      svg
        width 9px !important
        height 9px !important

  &__sublist
    margin-left 8px
    padding-left 24px
    border-left 1px dotted #333
    list-style-type disc
    &-item
      margin-top 4px
</style>