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

<script setup>
import { ref } from 'vue';
import { Reminder } from '../data/reminder';
import { useAppStore } from '../stores/Store';

const emit = defineEmits(['created']);

const store = useAppStore();
const reminder = ref(new Reminder());

const onAddreminderClick = () => {
  store.addReminder(reminder.value);
  reminder.value = new Reminder();
  emit('created');
};
</script>
