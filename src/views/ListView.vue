<template>
  <p class="text-xl">
    Tasks:
  </p>
  <div v-if="!hasTasks">
    <span>
      There are no tasks yet.
    </span>
  </div>
  <div class="my-3 overflow-y-scroll shadow-inner flex-1">
    <ul class="leading-7 flex flex-col gap-2 overflow-y-auto drop-shadow-md">
      <li
        v-for="(task, index) in store.sortedTasks"
        :id="task.uuid"
        :key="index"
        class="flex flex-col"
      >
        <div
          class="w-16 rounded-t-xl bg-red-400 flex justify-center items-center cursor-pointer p-1"
          @click="onDeleteTaskClick(task)"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 800 800"
          >
            <use :xlink:href="`${BinIcon}#icon`" />
          </svg>
        </div>
        <div class="flex-1">
          <div class="px-2 bg-zinc-50 border-b flex flex-row justify-between items-center">
            <span>{{ task.name }}</span>
            <div
              v-if="task.date"
              class="flex flex-row items-center gap-2 text-gray-500"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 800 800"
              >
                <use :xlink:href="`${ClockIcon}#icon`" />
              </svg>
              <span>{{ formatDate(task.date) }}</span>
            </div>
          </div>
          <div
            v-if="task.description"
            class="p-2 bg-zinc-50"
          >
            {{ task.description }}
          </div>
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

    <template #default="{ onClose }">
      <CreateTask @created="onClose" />
    </template>

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
import { useAppStore } from '@/stores/Store';
import { computed } from 'vue';
import ModalWindow from '@/components/ModalWindow.vue';
import CreateTask from '@/components/CreateTask.vue';
import ClockIcon from '@/assets/clock.svg';
import BinIcon from '@/assets/bin.svg';
import { formatDate } from '@/utils';

const store = useAppStore();
const hasTasks = computed(() => {
  return store.tasks?.length > 0;
});

const onDeleteTaskClick = (task) => {
  store.deleteTask(task);
}

</script>
