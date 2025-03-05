<template>
  <Modal :open="modalState?.shareModal" :name="'shareModal'">
    <div class="share-block">
      <h2 class="t-h--3">Share</h2>
      <!-- Все соцсети, где можно поделиться -->
      <ul class="share-block__list">
        <li>
          <a :href="'https://t.me/share/url?url=' + link + '&text=' + title" class="t-ui--s share-block__btn" target="_blank">
            <nuxt-icon name="socials/telegram" filled/>
            <span>Telegram</span>
          </a>
        </li>
        <li>
          <a :href="'https://twitter.com/intent/tweet?url=' + encodeURIComponent(link) + '&text=' + encodeURIComponent(title)" class="t-ui--s share-block__btn" target="_blank">
            <nuxt-icon name="socials/twitter-x" filled/>
            <span>X</span>
          </a>
        </li>
        <li>
          <button class="t-ui--s share-block__btn" @click="shareFacebook">
            <nuxt-icon name="socials/facebook" filled/>
            <span>Facebook</span>
          </button>
        </li>
        <li>
          <button class="t-ui--s share-block__btn" @click="shareWhatsapp">
            <nuxt-icon name="socials/whatsapp" filled/>
            <span>WhatsApp</span>
          </button>
        </li>
        <li>
          <a :href="'mailto:?subject=' + title + '&amp;body=' + link" class="t-ui--s share-block__btn" target="_blank">
            <nuxt-icon name="socials/email" filled/>
            <span>Email</span>
          </a>
        </li>
        <li class="t-ui--s hidden-desktop hidden-tablet d-flex justify-between copy" @click="copyPath">
          <span>Copy</span>
          <nuxt-icon name="ui/copy" v-if="!copy"/>
          <svg width="18" height="16" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" v-else>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.5L3.5 8L0 4.5L1.5 3L3.5 5L8.5 0L10 1.5Z"
                  fill="#282828"/>
          </svg>
        </li>
      </ul>

      <div class="d-flex hidden-mobile">
        <input type="text" value="link" v-model="link" class="share-block__input"/>
        <button class="share-block__copy" aria-label="Copy" title="Copy" @click="copyPath">
          <nuxt-icon name="ui/copy" v-if="!copy"/>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" v-else>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.5L3.5 8L0 4.5L1.5 3L3.5 5L8.5 0L10 1.5Z"
                  fill="#ffffff"/>
          </svg>
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
  import {useModalState} from "../../composables/globalState"
  const modalState = useModalState()

  let link = ref('')
  let copy = ref(false)
  let title = ref('')

  const route = useRoute()

  link.value = window.location.href
  title.value = document.title

  const copyPath = () => {
    navigator.clipboard.writeText(link.value);
    copy.value = true
    setTimeout(() => {
      copy.value = false
    }, 2000)
  }

  watch(() => route.fullPath, () => {
    link.value = window.location.origin + route.fullPath
    title.value = document.title
  })

  const shareWhatsapp = () => {
    if (navigator.userAgent.indexOf("Android") !== -1 || navigator.userAgent.indexOf("like Mac") !== -1 || window.webview) {
      window.open('whatsapp://send?text=' + title.value + ' ' + link.value)
    } else {
      window.open('https://web.whatsapp.com:/send?text=' + title.value + ' ' + link.value)
    }
  }

  const shareFacebook = () => {
    if (navigator.userAgent.indexOf("Android") !== -1 || navigator.userAgent.indexOf("like Mac") !== -1 || window.webview) {
      window.open(`fb://sharer.php?u=${link.value}&t=${title.value}`);
    } else {
      window.open(`https://www.facebook.com/sharer.php?u=${link.value}&t=${title.value}`, '_blank');
    }
  }

</script>

<style lang="stylus">
.share-block
  padding 24px
  .t-h
    font-size 32px
    font-weight 900
    letter-spacing 1px
  @media (max-width: 767px)
    padding 24px 16px

  &__list
    display flex
    margin-top 30px
    margin-bottom 16px
    gap 20px
    @media (max-width: 767px)
      margin-top 20px
      margin-bottom 0
      flex-direction column
      gap 0

  &__btn
    display flex
    flex-direction column
    gap 8px
    justify-content center

    svg, img
      width 56px
      height 56px
    @media (max-width: 767px)
      flex-direction row-reverse
      justify-content space-between
      width 100%
      border-bottom 1px #333333 dotted
      padding 9px 0
      align-items center
      svg, img
        width 30px !important
        height 30px !important

    span
      text-align center

  &__input
    flex 1
    display block
    width 100%
    background #333
    color white
    border none
    height 40px
    padding 0 12px
    outline none
    border-radius 4px
    font-weight 500
    font-size 12px

  .copy
    padding 9px 4px 9px 0
    cursor pointer
    svg
      width 20px !important
      height 20px !important
      margin-right 1px

  &__copy
    background #333
    color white
    border-radius 4px
    padding 12px
    margin-left 4px
    height 42px
    width 42px
    display flex
    justify-content center
    align-items center
</style>