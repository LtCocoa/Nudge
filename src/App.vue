<template>
  <div class="app-wrapper">
    <div class="app-sidebar">
      <div class="app-logo-wrapper select-none">
        <div class="app-logo">
          <div class="app-logo-icon">
            <img class="w-8 h-8" :src="logo" draggable="false">
          </div>
          <div class="app-logo-title">Nudge</div>
        </div>
      </div>
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
import logo from './assets/logo.png';

const store = useAppStore();

store.getAppData();

</script>

<style scoped>
.app-wrapper {
  @apply h-full w-full flex overflow-hidden;

  .app-sidebar {
    @apply flex-shrink-0 basis-64 p-6 bg-background-soft border-r;

    .app-logo-wrapper {
      @apply mb-4;

      .app-logo {
        @apply flex flex-row gap-2 items-center;

        .app-logo-title {
          @apply text-2xl font-bold;
        }
      }
    }
  }

  .app-content {
    @apply flex flex-1 p-6;
  }
}
</style>