<template>
  <Header/>
  <main>
    <div class="container">
      <div class="error-container d-flex flex-column justify-center align-center" v-if="ERROR_CODE === 404">
        <h1 class="t-h--1" ref="errHeader">ERROR 404</h1>
        <p class="error-message">This page is not found</p>
        <div class="error-btn d-flex justify-center">
          <button class="btn btn--black d-flex justify-center" @click="handleError">Home page</button>
        </div>
      </div>

      <div class="error-container d-flex flex-column justify-center align-center" v-else-if="ERROR_CODE === 403">
        <h1 class="t-h--1" ref="errHeader">ERROR 403</h1>
        <p class="error-message">Please login or register first</p>
        <div class="error-btn d-flex justify-center">
          <button class="btn btn--black d-flex justify-center" @click="openLogin">
            Log In
          </button>
        </div>
      </div>

      <div class="error-container d-flex flex-column justify-center align-center" v-else-if="ERROR_CODE === 503">
        <h1 class="t-h--1" ref="errHeader">The website is undergoing maintenance</h1>
        <p class="error-message">Please wait and reload the page a little later.</p>
        <div class="error-btn d-flex justify-center">
          <button class="btn btn--black d-flex justify-center" @click="reloadPage">Reload page</button>
        </div>
      </div>

      <div class="error-container d-flex flex-column justify-center align-center"
           v-else-if="ERROR_CODE >= 500 && ERROR_CODE < 600">
        <h1 class="t-h--1" ref="errHeader">Server error</h1>
        <p class="error-message">Please report the error to the administrator</p>
        <div class="error-btn d-flex justify-center">
          <button class="btn btn--black d-flex justify-center" @click="reloadPage">Reload page</button>
        </div>
      </div>

      <div class="error-container d-flex flex-column justify-center align-center" v-else>
        <h1 class="t-h--1" ref="errHeader">{{ ERROR_CODE }}</h1>
        <p class="error-message">{{ props.error.statusMessage }}</p>
        <div class="error-btn d-flex justify-center">
          <button class="btn btn--black d-flex justify-center" @click="reloadPage">Reload page</button>
        </div>
      </div>
    </div>
  </main>
  <Footer/>
</template>

<script setup>
const props = defineProps(['error'])

const ERROR_CODE = ref(props?.error?.statusCode ?? 500)

const handleError = () => {
  clearError({ redirect: '/' })
}

const openLogin = () => {
  alert('Log In is not available in the DEMO version')
}

const reloadPage = () => {
  location.reload()
}
</script>

<style lang="stylus">
.error
  &-container
    min-height calc(100svh - 235px)
    @media (max-width: 1199px)
      min-height calc(100svh - 85px)
      margin-top: 30px

    h1
      text-align center
      margin-bottom 0
      margin-top 60px

    img
      max-width 100%

  &-btn
    width 100%
    margin-top 30px

    button
      padding 13px 27px
      text-align center
      @media (max-width: 767px)
        width 100%
        min-width 100%

  &-message
    margin-top 16px
    text-align center

  &-img
    padding 0 37px
</style>