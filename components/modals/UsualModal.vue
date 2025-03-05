<template>
  <!-- Обычное сообщение, вместо alert -->
  <Modal :open="modalState?.usualModal" :name="'usualModal'">
    <div class="usual-modal">
      <h2 v-if="usualMessage?.title">{{usualMessage.title}}</h2>
      <p v-if="usualMessage?.text">{{usualMessage.text}}</p>
      <button class="btn btn--black" @click="setModalState('usualModal', false)">Close</button>
    </div>
  </Modal>
</template>

<script setup>
  import {useModalState, setModalState, useUsualMessage} from "../../composables/globalState"
  const modalState = useModalState()
  const usualMessage = useUsualMessage()
</script>

<style lang="stylus">
.usual-modal
  width 550px
  height 250px
  display flex
  flex-direction column
  align-items center
  justify-content center
  gap 16px
  h2
    font-size 32px
    line-height 42px
  button
    margin-top 24px
  @media (max-width: 767px)
    width 100%
    height max-content
    padding 24px 16px
    align-items flex-start
    h2
      font-size 28px
      line-height 37px
      max-width calc(100% - 32px)
    button
      margin-top 10px
</style>