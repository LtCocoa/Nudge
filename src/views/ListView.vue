<template>
  <div class="flex flex-1 flex-col">
    <div v-if="!hasReminders">
      <span class="font-semibold">There are no reminders yet.</span>
    </div>
    <div v-else>
      <div>
        <div class="font-bold text-2xl">Today reminders</div>
        <div class="text-text-secondary">{{ todayRemindersCountText }}</div>

        <div class="my-3 overflow-y-scroll flex-1 flex flex-col gap-2 px-4 py-2">
          <ReminderItem
            v-for="reminder in reminderStore.today"
            :key="reminder.id"
            :reminder
            show-time
          />
        </div>
      </div>

      <div>
        <div class="font-bold text-2xl">All reminders</div>
        <div class="text-text-secondary">{{ allRemindersCountText }}</div>

        <div class="my-3 overflow-y-scroll flex-1 flex flex-col gap-2 px-4 py-2">
          <ReminderItem
            v-for="reminder in reminderStore.upcoming"
            :key="reminder.id"
            :reminder
            show-date
            show-time
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/Store';
import { computed } from 'vue';
import ReminderItem from '../components/ReminderItem.vue';

const reminderStore = useAppStore();

const hasReminders = computed(() => {
  return reminderStore.reminders?.length > 0;
});

const allRemindersCountText = computed(() => {
  const count = reminderStore.reminders.length;
  return `${count} ${count > 1 ? 'reminders' : 'reminder'}`;
});

const todayRemindersCountText = computed(() => {
  const count = reminderStore.today.length;
  return `${count} ${count > 1 ? 'reminders' : 'reminder'}`;
});

</script>
