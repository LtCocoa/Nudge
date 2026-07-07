<template>
  <div v-if="!hasReminders">
    <span>There are no reminders yet.</span>
  </div>
  <div v-else>
    <div>All reminders</div>
    <div>{{ reminderCountText }}</div>
  </div>

  <div class="my-3 overflow-y-scroll flex-1 flex flex-col gap-2 px-4">
    <ReminderItem
      v-for="reminder in reminders.sorted"
      :key="reminder.id"
      :reminder
    />
  </div>

  <ModalWindow>
    <template #open-button="{ onOpen }">
      <button
        id="open-button"
        class="btn"
        type="button"
        @click="onOpen"
      >
        New reminder
      </button>
    </template>

    <template #default="{ onClose }">
      <CreateReminder @created="onClose" />
    </template>

    <template #close-button="{ onClose }">
      <button
        id="close-button"
        class="btn mt-2"
        type="button"
        @click="onClose"
      >
        Close
      </button>
    </template>
  </ModalWindow>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/Store';
import { computed } from 'vue';
import ModalWindow from '../components/ModalWindow.vue';
import CreateReminder from '../components/CreateReminder.vue';
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
