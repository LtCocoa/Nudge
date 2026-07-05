<template>
  <div class="reminder-container">
    <div class="flex flex-1 flex-col min-w-72">
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
      <div class="p-2 bg-violet-200 text-violet-700 rounded-md font-medium">
        {{ formatTime(reminder.date) }}
      </div>
    </div>
    <div
      class="reminder-delete-button"
      @click="store.deleteReminder(reminder)"
    >
      &#215
    </div>
  </div>
</template>

<script setup lang="ts">
import { Reminder } from '../../shared/models/Reminder';
import { useAppStore } from '../stores/Store';
import { formatDate, formatTime } from '../utils';

const store = useAppStore();


export interface ReminderItemProps {
  reminder: Reminder;
}

const props = defineProps<ReminderItemProps>();
</script>

<style scoped>
.reminder-container {
  @apply rounded-md border-2 border-gray-200 flex mr-2 items-center py-3 px-5 cursor-default relative;

  .reminder-delete-button {
    @apply absolute top-[-10px] right-[-10px] bg-red-400 rounded-full w-5 h-5 flex items-center justify-center opacity-0 cursor-pointer transition-opacity;
  }
}

.reminder-container:hover .reminder-delete-button {
  @apply opacity-100;
}


</style>