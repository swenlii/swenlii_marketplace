<template>
  <main>
    <div class="container categories" v-if="catalogTree?.length">
      <BreadCrumbs />
      <h1>Catalog</h1>
      <div class="categories-grid">
        <NuxtLink :to="category.url" v-for="(category) in catalogTree" class="categories-item">
          <div>{{category.title}}</div>
          <img v-if="category.icon_s3_url" :src="category.icon_s3_url" :alt="category.title">
        </NuxtLink>
      </div>
    </div>
  </main>

</template>

<script setup>
import {useBreadCrumbs, useCatalogTree} from "~/composables/catalogState";

const breadcrumbs = useBreadCrumbs()
breadcrumbs.value = [{"langTitle":"Home","url":"/"}]
const catalogTree = useCatalogTree()

useSeoMeta({
  title: "Catalog | Marketplace",
  ogTitle: "Catalog | Marketplace",
  twitterTitle: "Catalog | Marketplace",
  description: "Catalog | Marketplace",
  ogDescription: "Catalog | Marketplace",
  twitterDescription: "Catalog | Marketplace"
})
</script>

<style lang="stylus">
.categories h1
  font-size: 48px
  letter-spacing 1px
  text-transform uppercase
  color #414141

.categories-grid
  display grid
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 20px;
  margin-top: 32px
  grid-auto-rows 200px
  @media (max-width: 767px)
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows 100px
    grid-gap: 12px;
    margin-top: 24px

.categories-item
  background: #333
  color: white
  border-radius 4px;
  padding: 24px
  position relative
  overflow hidden
  font-size: 20px
  font-weight 600
  transition all .3s
  &:hover
    background: #262626
  @media (max-width: 767px)
    font-size: 12px
    font-weight 600
    grid-column: span 1 !important
    padding: 12px 8px
    &:nth-child(2n-1):nth-last-of-type(1)
        grid-column: span 2 !important;

.categories-item:nth-child(14n-13),
.categories-item:nth-child(14n-12)
  grid-column: span 6;

.categories-item:nth-child(14n-11),
.categories-item:nth-child(14n-10),
.categories-item:nth-child(14n-9)
.categories-item:nth-child(14n-8)
  grid-column: span 3;

.categories-item:nth-child(14n-7),
.categories-item:nth-child(14n-6),
.categories-item:nth-child(14n-5)
  grid-column: span 4;

.categories-item:nth-child(14n-4),
.categories-item:nth-child(14n-3)
  grid-column: span 6;

.categories-item:nth-child(14n-2)
.categories-item:nth-child(14n-1)
.categories-item:nth-child(14n)
  grid-column: span 4;

.categories-item img
  position: absolute
  height 142px
  right 0
  bottom 0
  @media (max-width: 767px)
    height: 64px
</style>