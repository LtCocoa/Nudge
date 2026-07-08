<template>
  <div class="flex flex-1 flex-col">
    <div v-if="!hasReminders">
      <span class="font-semibold">There are no reminders yet.</span>
    </div>
    <div v-else>
      <div class="font-bold text-2xl">All reminders</div>
      <div class="text-text-secondary">{{ reminderCountText }}</div>
    </div>

    <div class="my-3 overflow-y-scroll flex-1 flex flex-col gap-2 px-4 py-1">
      <ReminderItem
        v-for="reminder in reminders.sorted"
        :key="reminder.id"
        :reminder
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/Store';
import { computed } from 'vue';
import ReminderItem from '../components/ReminderItem.vue';

const reminders = useAppStore();

const hasReminders = computed(() => {
  return reminders.reminders?.length > 0;
});

const reminderCountText = computed(() => {
  const count = reminders.allCount;
  return `${count} ${count > 1 ? 'reminders' : 'reminder'}`;
});

</script>

<style scoped>
.icon {
  height: 20px;
  width: 20px;
}
</style>
