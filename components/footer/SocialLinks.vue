<template>
  <div class="profile-menu__social t-ui--m d-flex">
    <div class="profile-menu__social-text" v-if="text" :style="{fontSize: font + 'px'}">My social links:</div>
    <!-- Только мои ссылки -->
    <div class="profile-menu__social-icons" :class="'icon-' + icon">
      <NuxtLink to="https://vk.com/swenlii" :target="'_blank'">
        <nuxt-icon name="socials/vk" filled/>
      </NuxtLink>
      <NuxtLink to="https://t.me/swenlii" :target="'_blank'">
        <nuxt-icon name="socials/telegram" filled/>
      </NuxtLink>
      <NuxtLink to="https://github.com/swenlii" :target="'_blank'">
        <nuxt-icon name="socials/github" filled/>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['text', 'font', 'icon'])
</script>

<style lang="stylus">
.profile-menu__social
  margin-top: 20px;
  gap: 12px;
  border none
  background white
  padding: 12px 16px
  color var(--text-base)
  border-radius 12px
  align-items center
  &-icons
    display: flex
    gap 4px
    &.icon-22
      svg
        width 22px !important
        height 22px !important
    &.icon-32
      svg
        width 32px !important
        height 32px !important
    .nuxt-icon
      display block
      svg
        max-width 32px !important
        max-height 32px !important
      @media (max-width: 767px)
        svg
          width 24px !important
          height 24px !important
  @media (max-width: 1199px)
    padding: 12px 16px
    border-radius 12px
    border 1px solid var(--border-gray)
    display: flex
    justify-content space-between
    &-text
      max-width: 134px
    &-icons
      display: flex;
      gap: 12px

</style>