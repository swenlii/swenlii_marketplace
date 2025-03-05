<template>
  <nav class="pagination d-flex align-center justify-between" v-if="totalPages > 1" aria-label="Pagination">

    <NuxtLink @click.prevent.native="loadMore"
              v-if="!infinite"
              :to="linkTo(currentPage + 2)"
              class="pagination__load-more btn btn--black"
              :class="{'btn--disabled' : currentPage + 1 === totalPages,'btn--loading' : loading}">
      <span>Load more</span>
    </NuxtLink>

    <ul class="pagination__pages d-flex align-center"
        v-show="!infinite">
      <li>
        <NuxtLink :to="linkTo(currentPage)" @click="scrollToTop"
                  v-if="currentPage >= 1"
                  class="btn btn--black pagination__left pagination__arrow">
          <nuxt-icon name="ui/arrow"/>
          <span class="hidden-mobile">
            Back
          </span>
        </NuxtLink>
      </li>
      <li v-for="index in pagination"
          :key="index">
        <NuxtLink :to="linkTo(index)" @click="scrollToTop"
                  class="btn btn--black"
                  :class="{'btn--disabled' : index === (currentPage + 1)}">
          {{ index }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="linkTo(currentPage + 2)" @click="scrollToTop"
                  v-if="currentPage < totalPages - 1"
                  class="btn btn--black pagination__right pagination__arrow">
            <span class="hidden-mobile">
              Next
            </span>
            <nuxt-icon name="ui/arrow"/>
        </NuxtLink>
      </li>
    </ul>
    <!-- Блок для бесконечной прокрутки -->
    <div class="pagination__infinite d-flex justify-center"
         v-if="infinite && currentPage + 1 !== totalPages"
         v-element-visibility="onElementVisibility">
      <img src="~/assets/img/loader.png" v-if="loading" alt="Loading..."/>
    </div>
  </nav>
</template>

<script setup>
  // Идея использования vElementVisibility нагло украдена со StackOverflow,
  // код взят с офф документации: https://vueuse.org/core/useElementVisibility/
  import { vElementVisibility } from '@vueuse/components'
  const { $event } = useNuxtApp()
  const route = useRoute()
  const router = useRouter()
  const props = defineProps(['totalPages', 'loading', 'infinite'])

  const currentPage = computed(() => {
    return route.query.page ? route.query.page - 1 : 0
  })

  const loadMore = () => {
    $event('loadMore', true)
  }

  const linkTo = (index) => {
    return {
      path: route.path,
      query: { ...route.query, 'page': (index > 1) ? index : undefined },
    }
  }

  const onElementVisibility = (state) => {
    if (state) {
      loadMore()
      router.push(linkTo(currentPage.value + 2))
    }
  }

  const scrollToTop = () => {
    $event('loadMore', false)
    window.scrollTo({
      top: 0
    })
  }

  const pagination = computed(() => {
    let pages = []
    let result = []
    let currentPage = route.query.page ? route.query.page - 1 : 0
    if (props.totalPages > 5) {
      for (let i = 1; i <= props.totalPages; i++) {
        pages.push(i)
      }
      if (currentPage <= 2) {
        //1 2 3 4 5
        result.push(...pages.slice(0, 4))
        result.push(...pages.slice(-1))
      } else if (currentPage >= pages.length - 3) {
        //1 7 8 9 10
        result.push(...pages.slice(0,1))
        result.push(...pages.slice(-4))
      } else {
        //1 4 5 6 10
        result.push(...pages.filter(item => {
          return item === 1 || item === currentPage || item === currentPage + 1 || item === currentPage + 2 || item === pages.length
        }))
      }
      return result
    }
    return props.totalPages
  })
</script>


<style lang="stylus">
.pagination
  margin-top 32px
  @media (max-width: 767px)
    flex-direction column
    gap 16px

  &__load-more
    min-width 240px

  .btn
    user-select none

  &__pages
    gap 8px

    .btn
      min-width 40px
      height 40px
      padding 0 4px
      &.pagination__arrow
        padding 0 18px

  &__left
    .nuxt-icon
      transform rotate(180deg)

  &__infinite
    display flex
    justify-content center
    align-items center
    width 100%
    img
      animation-name spin
      animation-duration 1s
      animation-iteration-count infinite
      animation-timing-function linear
      width 40px
      display block
</style>