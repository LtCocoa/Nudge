<template>
  <div class="flex flex-col">
    <p>{{ store.currentProfile.name }}</p>

    <template v-if="hasTasks">
      <p>Tasks:</p>
      <ul>
        <li
          v-for="(task, index) in store.currentProfile.tasks"
          :key="index"
        >
          {{ task.name }}
        </li>
      </ul>
    </template>
    <p v-else>
      There are no tasks yet
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAppStore } from '../stores/Store';

const store = useAppStore();
const hasTasks = computed(() => {
  return store.currentProfile.tasks?.length > 0;
});

</script>


<style scoped>

</style>
