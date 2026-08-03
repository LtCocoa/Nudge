<template>
  <div class="flex flex-1 flex-col">
    <div v-if="!hasReminders">
      <span class="font-semibold">There are no reminders yet.</span>
    </div>
    <div v-else class="flex flex-1 flex-col">
      <div class="font-bold text-2xl">{{ header }}</div>
      <div class="text-text-secondary">{{ remindersCountText }}</div>

      <div class="my-3 flex-1 flex flex-col gap-2 px-4 py-2 overflow-y-scroll">
        <ReminderItem
          v-for="reminder in reminderStore.filteredReminders"
          :key="reminder.id"
          :reminder
          :show-date="reminderStore.currentFilter !== ReminderFilter.Today"
          show-time
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ReminderFilter, useAppStore } from '../stores/appStore';
import ReminderItem from '../components/ReminderItem.vue';

const reminderStore = useAppStore();

const header = computed(() => {
  return `${ReminderFilter[reminderStore.currentFilter]} reminders`;
});

const hasReminders = computed(() => {
  return reminderStore.reminders?.length > 0;
});

const remindersCountText = computed(() => {
  const count = reminderStore.filteredReminders.length;
  return `${count} ${count > 1 ? 'reminders' : 'reminder'}`;
});


</script>
