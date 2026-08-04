<template>
  <div class="flex flex-1 flex-col">
    <div class="flex w-full">
      <div class="flex flex-1 flex-col">
        <div class="font-bold text-2xl">{{ header }}</div>
        <div class="text-text-secondary">{{ remindersCountText }}</div>
      </div>

      <div class="flex-1">
        <AppInput @input="debouncedOnInput" placeholder="Search..." />
      </div>
    </div>

    <div class="reminders">
      <ReminderItem
        v-for="reminder in appStore.filteredCategorisedReminders"
        :key="reminder.id"
        :reminder
        :show-date="appStore.currentCategory !== ReminderCategory.Today"
        show-time
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ReminderCategory, useAppStore } from '../stores/appStore';
import ReminderItem from '../components/ReminderItem.vue';
import AppInput from '../components/AppInput.vue';
import { debounce } from '../utils';

const appStore = useAppStore();

function onInput(e: InputEvent) {
  appStore.setFilter((e.target as HTMLInputElement).value);
}

const debouncedOnInput = debounce(onInput, 300);

const header = computed(() => {
  return `${ReminderCategory[appStore.currentCategory]}`;
});

const remindersCountText = computed(() => {
  const count = appStore.categorisedReminders.length;
  if (!count) return 'No reminders';
  return `${count} ${count > 1 ? 'reminders' : 'reminder'}`;
});

</script>

<style scoped>
  .reminders {
    @apply flex-1 flex flex-col gap-2 my-3 px-4 py-2 overflow-y-scroll;
  }
</style>