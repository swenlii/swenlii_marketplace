<template>
  <Transition name="modal" appear>
    <section class="modal-wrap" v-if="open"
             @mousedown.self="closeModal" @keydown.esc="closeModal"
             aria-atomic="true" role="dialog">
      <div class="modal" ref="trapRef" @mousedown.stop>
        <button class="modal__close"
                @click.prevent="closeModal" aria-label="Close" title="Close">
          <nuxt-icon name="ui/x" />
        </button>
        <slot></slot>
      </div>
    </section>
  </Transition>
</template>

<script setup>
import {setModalState} from "../../composables/globalState"
import useFocusTrap from "../../composables/useFocusTrap";

const props = defineProps(['open', 'name'])

// При закрытии окна
const closeModal = () => {
  if (props?.name) setModalState(props.name, false)
}

// ЗАключаем фокус внутри элемента и делаем его циклируемым
const {trapRef} = useFocusTrap();

// Дизейблим скролл страницы при открывании модалки
onMounted(() => {
  document.querySelector('body').style.removeProperty('position')
  if (props?.open) {
    document.querySelector('body').style.position = 'fixed'
  }
})

// Дизейблим скролл страницы при открытой модалке
onUpdated(() => {
  document.querySelector('body').style.removeProperty('position')
  if (props?.open) {
    document.querySelector('body').style.position = 'fixed'
  }
})

// для случаев, если не отследили изменение модалки и ушли с экрана
onUnmounted(() => {
  document.querySelector('body').style.removeProperty('position')
})
</script>

<style lang="stylus">
.modal
  position relative
  &__close
    position absolute
    top 8px
    right 8px
    width 32px
    height 32px
    background #333
    color white
    border-radius 4px
    display flex
    justify-content center
    align-items center
    z-index 99

.modal-wrap
  position fixed
  width 100vw
  height 100%
  left 0
  top 0
  background rgba(0, 0, 0, .5)
  display flex
  justify-content center
  align-items center
  z-index 9999
  .modal
    background #fff
    border-radius 4px
    overflow hidden
  @media (max-width: 767px)
    align-items flex-end
    .modal
      width 100%
      border-bottom-left-radius 0
      border-bottom-right-radius 0
      height auto
      max-height 100%
      &__content
        height 100%

.modal-enter-active,
.modal-leave-active
  transition all 0.3s ease-out

.modal-enter-from
.modal-leave-to
  opacity 0

</style>