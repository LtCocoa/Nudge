<template>
  <p class="text-xl">
    Reminders:
  </p>
  <div v-if="!hasReminders">
    <span>
      There are no reminders yet.
    </span>
  </div>
  <div class="my-3 overflow-y-scroll shadow-inner flex-1">
    <ul class="leading-7 flex flex-col gap-2 overflow-y-auto drop-shadow-md">
      <li
        v-for="(reminder) in store.sortedReminders"
        :id="reminder.id"
        :key="reminder.id"
        class="flex flex-col"
      >
        <div
          class="w-16 rounded-t-xl bg-red-400 flex justify-center items-center cursor-pointer p-1"
          @click="onDeleteReminderClick(reminder)"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 800 800"
          >
            <BinIcon />
          </svg>
        </div>
        <div class="flex-1">
          <div class="px-2 bg-zinc-50 border-b flex flex-row justify-between items-center">
            <span>{{ reminder.title }}</span>
            <div
              v-if="reminder.date"
              class="flex flex-row items-center gap-2 text-gray-500"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 800 800"
              >
                 <ClockIcon />
              </svg>
              <span>{{ formatDate(reminder.date) }}</span>
            </div>
          </div>
          <div
            v-if="reminder.description"
            class="p-2 bg-zinc-50"
          >
            {{ reminder.description }}
          </div>
        </div>
      </li>
    </ul>
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
import { formatDate } from '../utils';
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
