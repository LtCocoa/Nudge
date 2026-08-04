<template>
  <div class="flex flex-col text-lg gap-2">
    <AppInput
      label="Title"
      v-model="reminder.title"
    />

    <AppTextarea
      label="Description"
      v-model="reminder.description"
    />

    <AppDatetimeInput
      label="Date and time"
      v-model="reminder.date"
    />

    <!-- <div>
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
    </div> -->

    <AppButton
      variant="primary"
      @click="onAddreminderClick"
    >
      Add
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from '../stores/appStore';
import { Reminder } from '../../shared/models/Reminder';
import { createReminder } from '../utils';
import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';
import AppTextarea from './AppTextarea.vue';
import AppDatetimeInput from './AppDateTimeInput.vue';

const emit = defineEmits(['created']);

const appStore = useAppStore();
const reminder = ref<Reminder>(createReminder());

const onAddreminderClick = () => {
  appStore.createReminder(reminder.value);
  reminder.value = createReminder();
  emit('created');
};
</script>
