<template>
  <main class="home">
    <div class="container">

      <HomeMetaCategories :categories="catalogTree"/>

      <HomeBanner :banner="toGitBanner"/>

      <HomeProducts :title="'Popular'"
                    :link="'/popular'"
                    :api-url="'/get-products/discounted'"
                    :limit="6"
                    :index="'tvoynovyyiphoneuzhezdes'"
      />

      <MetaCategoryGrid :grid="[4]"
                        :id="catalogTree[0].id"
      />

      <HomeBanner :banner="mySiteBanner"/>

      <MetaCategoryGrid :grid="[2,3]"
                        :id="catalogTree[8].id"
      />
    </div>
  </main>
</template>

<script setup>
  import {useCatalogTree} from "~/composables/catalogState";
  const catalogTree = useCatalogTree()

  let mySiteBanner = ref({
    color: '#fff',
    bgColor: '#466381',
    show: true,
    title: 'My personal website',
    text: 'Go to my portfolio and check my skills and works',
    link: 'https://github.com/swenlii',
    image: '/img/github-banner.png',
    btnText: 'Go to my website'
  })

  let toGitBanner = ref({
    color: '#fff',
    bgColor: '#333',
    show: true,
    title: 'Welcome ty my site!',
    text: 'The code for this site is publicly available. You can see it in my git profile.',
    link: 'https://github.com/swenlii',
    image: '/img/banner.jpg',
    btnText: 'Show me the code'
  })

  useSeoMeta({
    title: 'Marketplace',
    ogTitle: 'Marketplace',
    twitterTitle: 'Marketplace',
    description: 'Marketplace',
    ogDescription: 'Marketplace',
    twitterDescription: 'Marketplace'
  })
</script>

<style lang="stylus">
  .home
    padding-top 10px
    .container > *
      margin-top 40px
      @media (max-width: 1199px)
        margin-top 32px
      &:first-child
        margin-top 0
        @media (max-width: 1199px)
          margin-top 0
    &__divider
      height 1px
      background: #DADADC
    &-section
      &__head
        margin-bottom 24px
        @media (max-width: 1199px)
          margin-bottom 16px
        h2
          font-size 32px
          @media (max-width: 1199px)
            font-size 24px
      &__link
        gap 8px
        @media (max-width: 767px)
          font-size 0
          svg
            width 16px !important
            height 16px !important
</style>
