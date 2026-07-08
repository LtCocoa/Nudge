<template>
  <div class="app-wrapper">
    <div class="app-sidebar">
      <CreateReminderButton />
    </div>

    <div class="app-content">
      <ListView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from './stores/Store';
import ListView from './views/ListView.vue';
import CreateReminderButton from './components/CreateReminderButton.vue';

const store = useAppStore();

store.getAppData();

</script>

<style scoped>
.app-wrapper {
  @apply h-full w-full flex overflow-hidden;

  .app-sidebar {
    @apply flex-shrink-0 basis-64 p-6 bg-background-soft border-r;
  }

  .app-content {
    @apply flex flex-1 p-4;
  }
}
</style>