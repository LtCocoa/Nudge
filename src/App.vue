<template>
  <div class="app-wrapper">
    <AppSidebar />

    <div class="app-content">
      <ReminderList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from './stores/appStore';
import ReminderList from './views/ReminderList.vue';
import AppSidebar from './components/AppSidebar.vue';
import { getTimeToNextDay } from './utils';

const appStore = useAppStore();
appStore.getReminders();

const updateCurrentDate = () => {
  appStore.updateCurrentDate();

  setTimeout(() => {
    updateCurrentDate();
  }, getTimeToNextDay());
}

updateCurrentDate();

</script>

<style scoped>
.app-wrapper {
  @apply h-full w-full flex overflow-hidden;

  .app-content {
    @apply flex flex-1 p-6;
  }
}
</style>