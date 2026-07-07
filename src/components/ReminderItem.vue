<template>
  <div class="reminder-container gap-3 select-none">
    <div class="flex flex-1 flex-col min-w-72 overflow-hidden">
      <div class="font-medium">
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
      <div class="p-2 bg-neutral-300 text-gray-950-700 rounded-md font-medium">
        {{ formatDate(reminder.date) }}
      </div>
      <div class="p-2 bg-primary-soft text-primary-strong rounded-md font-medium flex gap-1 cursor-pointer">
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
import { useAppStore } from '../stores/Store';
import { formatDate, formatTime } from '../utils';
import { AlarmClock, Trash2 } from '@lucide/vue';

export interface ReminderItemProps {
  reminder: Reminder;
}

const store = useAppStore();
const props = defineProps<ReminderItemProps>();
</script>

<style scoped>
.reminder-container {
  @apply flex rounded-md shadow-md bg-zinc-50 mr-2 items-center py-3 px-5 cursor-default relative;
}

.reminder-delete {
  @apply cursor-pointer text-red-700;
}
</style>