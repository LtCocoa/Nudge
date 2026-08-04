<template>
  <div class="app-sidebar">
    <div class="app-logo-wrapper select-none">
      <div class="app-logo">
        <div class="app-logo-icon w-8 h-8">
          <img :src="logo" draggable="false">
        </div>
        <div class="app-logo-title">Nudge</div>
      </div>
    </div>

    <div class="mt-3" >
      <CreateReminderButton />
    </div>

    <ReminderCategorySwitch />
  </div>
</template>

<script setup lang="ts">
import CreateReminderButton from './CreateReminderButton.vue';
import ReminderCategorySwitch from './ReminderCategorySwitch.vue';
import logo from '../assets/logo.png';

</script>

<style scoped>
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
</style>