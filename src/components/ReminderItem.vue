<template>
  <div class="reminder-container">
    <div class="flex flex-1 flex-col min-w-72 overflow-hidden">
      <div class="font-semibold">
        {{ reminder.title }}
      </div>
      <div>
        {{ reminder.description }}
      </div>
    </div>

    <div
      v-if="reminder.date"
      class="flex gap-2"
    >
      <div
        class="reminder-date"
        v-if="showDate"
      >
        {{ formatDate(reminder.date) }}
      </div>
      <div
        class="reminder-time"
        v-if="showTime"
      >
        <AlarmClock :size="23" />
        <span>{{ formatTime(reminder.date) }}</span>
      </div>
    </div>
    <div
      class="reminder-delete"
      @click="store.deleteReminder(reminder)"
    >
      <Trash2 :size="20" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Reminder } from '../../shared/models/Reminder';
import { useReminderStore } from '../stores/appStore';
import { formatDate, formatTime } from '../utils';
import { AlarmClock, Trash2 } from '@lucide/vue';

export interface ReminderItemProps {
  reminder: Reminder;
  showDate?: boolean;
  showTime?: boolean;
}

const store = useReminderStore();
const props = withDefaults(
  defineProps<ReminderItemProps>(),
  {
    showDate: false,
    showTime: false,
  }
);
</script>

<style scoped>
.reminder-container {
  @apply bg-background-soft flex rounded-md drop-shadow-md shadow-slate-300 mr-2 items-center py-3 px-5 gap-3 select-none;
}

.reminder-date {
  @apply p-2 bg-neutral-300 rounded-md font-medium flex items-center;
}

.reminder-time {
  @apply p-2 bg-primary-soft text-primary-strong rounded-md font-medium cursor-pointer flex gap-1 items-center;
}

.reminder-delete {
  @apply cursor-pointer text-gray-300 hover:text-red-700 transition-colors;
}
</style>