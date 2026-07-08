<template>
  <div class="app-wrapper">
    <div class="app-sidebar">
      <div class="app-logo-wrapper select-none">
        <div class="app-logo">
          <div class="app-logo-icon w-8 h-8">
            <img :src="logo" draggable="false">
          </div>
          <div class="app-logo-title">Nudge</div>
        </div>
      </div>
      <CreateReminderButton />

      <div class="view-list">
        <div class="view-item">
          <CalendarDays />
          <span class="view-item-title">All reminders</span>
          <span class="view-item-count">{{ reminderStore.reminders.length }}</span>
        </div>
        <div class="view-item">
          <CalendarClock />
          <span class="view-item-title">Today</span>
          <span
            class="view-item-count">{{ reminderStore.today.length }}</span>
        </div>
        <div class="view-item">
          <CalendarSync />
          <span class="view-item-title">Repeatable</span>
          <span class="view-item-count">0</span>
        </div>
        <div class="view-item">
          <CalendarCheck2 />
          <span class="view-item-title">Completed</span>
          <span class="view-item-count">0</span>
        </div>
        <div class="view-item">
          <Calendar />
          <span class="view-item-title">Without date</span>
          <span class="view-item-count">0</span>
        </div>
      </div>
    </div>

    <div class="app-content">
      <ListView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReminderStore } from './stores/Store';
import ListView from './views/ListView.vue';
import CreateReminderButton from './components/CreateReminderButton.vue';
import logo from './assets/logo.png';
import { CalendarClock } from '@lucide/vue';
import { CalendarDays } from '@lucide/vue';
import { CalendarSync } from '@lucide/vue';
import { CalendarCheck2 } from '@lucide/vue';
import { Calendar } from '@lucide/vue';

const reminderStore = useReminderStore();

reminderStore.getReminders();

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
    .view-list {
      @apply flex flex-col gap-1 mt-5 select-none;

      .view-item {
        @apply flex gap-3 p-2 hover:bg-primary-soft rounded-md cursor-pointer transition-colors text-text-secondary hover:text-primary-strong font-semibold;

        .view-item-count {
          @apply ml-auto bg-background-soft px-2 rounded;
        }
      }
    }
  }

  .app-content {
    @apply flex flex-1 p-6;
  }
}
</style>