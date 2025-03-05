<template>
  <div>
    <footer class="footer">
      <div class="container">
        <div>
          <div class="footer__head">Footer</div>
          <SocialLinks :text="true" :font="14" :icon="32"/>
        </div>
        <!-- Вместо ссылок просто какой-то текст -->
        <div class="footer__text">
          <p>Written by <a href="https://github.com/swenlii">swenlii</a></p>
          <p>Source code on <a href="https://github.com/swenlii">github</a></p>
          <p>The original design and API methods are taken from <br> my previous work</p>
          <p>The code is developed in-house</p>
          <p>Created to show my capabilities in development</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="stylus">
.footer
  padding 44px 0 18px
  background #333
  color white
  .container
    display flex
    justify-content space-between
    @media (max-width: 767px)
      flex-direction column
  &__head
    font-size 50px
    font-weight 900
    margin-bottom 24px
    @media (max-width: 767px)
      font-size 40px
  &__text
    font-size 14px
    text-align right
    p
      margin 24px 0
      @media (max-width: 767px)
        font-size 10px
        margin 12px 0
    a
      text-decoration underline
      cursor pointer
</style>
