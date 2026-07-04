<template>
  <div class="flex flex-col text-xl gap-2">
    <label for="reminder-name">Name:</label>
    <input
      id="reminder-name"
      v-model="reminder.title"
      class="input"
      type="text"
    >

    <label for="reminder-description">Description:</label>
    <textarea
      id="reminder-description"
      v-model="reminder.description"
      class="input max-h-60"
      type="text"
    />

    <label for="reminder-schedule">Schedule:</label>
    <input
      id="reminder-schedule"
      v-model="reminder.date"
      class="input"
      type="datetime-local"
    >

    <div>
      <input
        id="reminder-recurrency"
        v-model="reminder.isRecurrent"
        class="input"
        type="checkbox"
      >
      <label
        for="reminder-recurrency"
        class="ml-2"
      >Recurrent</label>
    </div>

    <button
      type="button"
      class="btn mt-10"
      @click="onAddreminderClick"
    >
      Add
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from '../stores/Store';
import { Reminder } from '../../shared/models/Reminder';
import { createReminder } from '../utils';

const emit = defineEmits(['created']);

const store = useAppStore();
const reminder = ref<Reminder>(createReminder());

const onAddreminderClick = () => {
  store.addReminder(reminder.value);
  reminder.value = createReminder();
  emit('created');
};
</script>
