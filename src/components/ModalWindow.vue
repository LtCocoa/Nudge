<template>
  <slot
    name="open-button"
    :on-open="onOpen"
  />

  <Teleport to="body">
    <Transition
      name="fade"
      appear
    >
      <div
        v-if="isOpen"
        class="fixed h-full w-full top-0 left-0 flex items-center justify-center bg-zinc-400 bg-opacity-50"
        @mousedown.self="onClose"
      >
        <div
          ref="modalContent"
          class="p-4 rounded-xl bg-standart shadow-xl w-96"
        >
          <slot :on-close="onClose" />
          <slot
            name="close-button"
            :on-close="onClose"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
const modalContent = ref(null);

const onOpen = () => {
  isOpen.value = true;
};

const onClose = () => {
  isOpen.value = false;
};

</script>

<style scoped>
.modal-content {
  background-color: #9b9b9b;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .1s;
}

.fade-enter,
.fade-leave-to {
  transition: opacity .1s;
}

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>