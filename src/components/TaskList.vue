<template>
  <template v-if="hasTasks">
    <p class="text-xl">
      Tasks:
    </p>
    <div class="my-3 overflow-y-scroll shadow-inner">
      <ul class="leading-7 flex flex-col gap-2 overflow-y-auto drop-shadow-md">
        <li
          v-for="(task, index) in store.currentProfile.tasks"
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
  </template>
  <div v-else>
    <span>
      There are no tasks yet.
    </span>
  </div>
</template>

<script setup>
import { useAppStore } from '../stores/Store';
import { computed } from 'vue';


const store = useAppStore();
const hasTasks = computed(() => {
  return store.currentProfile.tasks?.length > 0;
});

</script>
