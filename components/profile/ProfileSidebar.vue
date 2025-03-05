<template>
  <div class="profile-sidebar flex-column justify-between" v-if="userInfo?.name">
    <div>
      <!-- Инфа о пользователе (конечно не настоящая) -->
      <section class="profile-sidebar__panel" aria-label="User">
        <p class="profile-sidebar__head t-h--3">User</p>
        <strong class="profile-sidebar__name d-flex align-center t-title--m">
          {{ userInfo.name.split(' ')[0] }}
        </strong>
        <p class="profile-sidebar__phone t-text--s">{{ userInfo.phone }}</p>
        <p class="profile-sidebar__phone t-text--s hidden-text" v-if="userInfo.email">
          <span class="title">{{ userInfo.email }}</span>
          <span class="tip" v-if="userInfo.email.length > 20">{{ userInfo.email }}</span>
        </p>
      </section>

      <!-- Ссылки на страницы профиля -->
      <nav class="profile-sidebar__nav" aria-label="User's links">
        <ul>
          <li>
            <NuxtLink class="t-ui--m" :to="'/profile/favorites'"
                      :class="{active: route.path.includes('favorites')}">
              Favorites
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="t-ui--m" :to="'/profile/orders'"
                      :class="{active: route.path.includes('order')}">
              Orders
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="t-ui--m" :to="'/profile/history'"
                      :class="{active: route.path.includes('history')}">
              History
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

  </div>
</template>

<script setup>
  const userInfo = ref({
      id: '122112',
      userid: '1213234',
      name: 'TestName',
      email: 'test@email.com',
      phone: '+12 12 33 44 55',
      userAddress: '12345678990'
  })
  const route = useRoute()
</script>

<style lang="stylus">
.profile
  display flex
  align-items flex-start
  gap 30px

  &__sidebar
    width 170px
    flex-shrink 0
    min-height calc(100svh - 150px)
    position sticky
    top 120px
    @media (max-width: 1199px)
      display none

  &__content
    width 100%

  &-sidebar
    &__panel
      margin-bottom 24px
      background #333
      color white
      border-radius 8px
      padding 12px

    &__head
      color white
      margin-bottom 18px

    &__name
      margin-bottom 4px
      gap 4px

    &__phone
      color var(--text-gray)
      margin-bottom 4px

    &__nav
      a
        display block
        margin-bottom 8px

        &.active
          color var(--accent)
          text-decoration underline

    &__bottom
      display block
      margin-top 200px
      .btn
        padding 0 6px
        justify-content center
        width 100%
        margin-bottom 8px
      a
        color var(--text-gray)
        padding 8px 0
        font-size 12px
        line-height 14px
        font-weight 600
        text-decoration underline

.hidden-text
  max-width 100%
  display block
  position relative
  .title
    max-width 100%
    overflow hidden
    text-overflow ellipsis
    display block
  .tip
    content attr(data-title)
    position absolute
    z-index 2
    background white
    padding 8px 12px
    left -15px
    top -35px
    display none
    width fit-content
    max-width 100vw
    border 1px solid #DADADC
    border-radius 8px
    color var(--text-base)
  &:hover .tip
    display block
</style>