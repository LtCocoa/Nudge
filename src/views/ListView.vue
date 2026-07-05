<template>
  <div v-if="!hasReminders">
    <span>
      There are no reminders yet.
    </span>
  </div>

  <div class="my-3 overflow-y-scroll flex-1 flex flex-col gap-2 ">
    <ReminderItem
      v-for="reminder in store.sortedReminders"
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
import { formatFullDate } from '../utils';
import { Reminder } from '../../shared/models/Reminder';
import ClockIcon from '@/assets/clock.svg';
import BinIcon from '@/assets/bin.svg';

const store = useAppStore();

const hasReminders = computed(() => {
  return store.reminders?.length > 0;
});

const onDeleteReminderClick = (reminder: Reminder) => {
  store.deleteReminder(reminder);
}

</script>

<style scoped>
.icon {
  height: 20px;
  width: 20px;
}
</style>
