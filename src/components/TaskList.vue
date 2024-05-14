<template>
  <p class="text-xl">
    Tasks:
  </p>
  <div v-if="!hasTasks">
    <span>
      There are no tasks yet.
    </span>
  </div>
  <div class="my-3 overflow-y-scroll shadow-inner">
    <ul class="leading-7 flex flex-col gap-2 overflow-y-auto drop-shadow-md">
      <li
        v-for="(task, index) in store.tasks"
        :id="task.uuid"
        :key="index"
        class="rounded-lg"
      >
        <div class="px-2 bg-zinc-50 border-b">
          {{ task.name }}
        </div>
        <div class="p-2 bg-zinc-50">
          {{ task.description }}
        </div>
      </li>
    </ul>
  </div>
  <ModalWindow>
    <template #open-button="{ onOpen }">
      <button
        class="btn"
        type="button"
        @click="onOpen"
      >
        New task
      </button>
    </template>
    <CreateTask />
    <template #close-button="{ onClose }">
      <button
        class="btn mt-2"
        type="button"
        @click="onClose"
      >
        Close
      </button>
    </template>
  </ModalWindow>
</template>

<script setup>
import { useAppStore } from '../stores/Store';
import { computed } from 'vue';
import ModalWindow from './ModalWindow.vue';
import CreateTask from './CreateTask.vue';


const store = useAppStore();
const hasTasks = computed(() => {
  return store.tasks?.length > 0;
});

</script>
