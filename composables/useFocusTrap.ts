// Заключает фокус внутри элемента и делает его циркулируемым
// Источник: https://www.telerik.com/blogs/how-to-trap-focus-modal-vue-3

import { customRef } from "vue";

const focusableElementsSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const useFocusTrap = () => {
  let focusableElements = [];
  let $firstFocusable;
  let $lastFocusable;
  const trapRef = customRef((track, trigger) => {
    let $trapEl = null;
    return {
      get() {
        track();
        return $trapEl;
      },
      set(value) {
        $trapEl = value;
        value ? initFocusTrap() : clearFocusTrap();
        trigger();
      },
    };
  });

  function keyHandler(e) {
    const isTabPressed = e.key === "Tab";

    if (!isTabPressed) return;

    if (e.shiftKey) {
      if (document.activeElement === $firstFocusable) {
        $lastFocusable.focus()
        e.preventDefault();
      }
    } else {
      if (document.activeElement === $lastFocusable) {
        $firstFocusable.focus();
        e.preventDefault();
      }
    }
  }

  function initFocusTrap() {
    // Bail out if there is no value
    if (!trapRef.value) return;
    focusableElements = trapRef.value.querySelectorAll(
      focusableElementsSelector
    );
    $firstFocusable = focusableElements[0];
    $lastFocusable = focusableElements[focusableElements.length - 1]
    document.addEventListener("keydown", keyHandler);
    // Check if focus already in element
    let focusable = false
    for (let i = 0; i < focusableElements.length; i++) {
      if (document.activeElement === focusableElements[i]) {
        focusable = true
      }
    }
    if (!focusable)
      $firstFocusable.focus();
  }

  function clearFocusTrap() {
    document.removeEventListener("keydown", keyHandler);
  }

  return {
    trapRef,
    initFocusTrap,
    clearFocusTrap,
  };
};

export default useFocusTrap;
