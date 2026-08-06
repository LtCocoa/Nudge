<template>
  <div class="flex flex-1 flex-col">
    <div class="flex w-full">
      <div class="flex flex-1 flex-col select-none">
        <div class="font-bold text-2xl">{{ header }}</div>
        <div class="text-text-secondary">{{ remindersCountText }}</div>
      </div>

      <div class="flex flex-1 justify-center items-center gap-1">
        <AppInput
          class="flex-1"
          placeholder="Search..."
          v-model="filterQuery"
        />
        <div class="flex flex-0 justify-center items-center bg-neutral-200 rounded-md cursor-pointer">
          <div class="p-2.5" @click="onSortClick">
            <component :is="appStore.sortOrder == 'ASC' ? ArrowDownAZ : ArrowUpAZ" />
          </div>
        </div>
      </div>
    </div>

    <div class="reminders">
      <ReminderItem
        v-for="reminder in filteredReminders"
        :key="reminder.id"
        :reminder
        :show-date="appStore.currentCategory !== ReminderCategory.Today"
        show-time
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { ReminderCategory, useAppStore } from '../stores/appStore';
import ReminderItem from '../components/ReminderItem.vue';
import AppInput from '../components/AppInput.vue';
import { ArrowUpAZ, ArrowDownAZ } from '@lucide/vue';
import { debounce } from '../utils';

const appStore = useAppStore();

const filterQuery = ref('');
const filter = ref('');

function setFilter(value: string) {
  filter.value = value;
}

const debouncedSetFilter = debounce(setFilter, 300);

watch(filterQuery, value => {
  if (!value) {
    setFilter(value);
  } else {
    debouncedSetFilter(value);
  }
});

const filteredReminders = computed(() => {
  if (!filter.value) return appStore.categorisedReminders;

  return appStore.categorisedReminders.filter(reminder => 
    reminder.title.toLowerCase().includes(filter.value) ||
    reminder.description.toLowerCase().includes(filter.value));
});

const header = computed(() => {
  return `${ReminderCategory[appStore.currentCategory]}`;
});

const remindersCountText = computed(() => {
  const count = appStore.categorisedReminders.length;
  if (!count) return 'No reminders';
  return `${count} ${count > 1 ? 'reminders' : 'reminder'}`;
});

const onSortClick = () => {
  appStore.setSortTitle(appStore.sortOrder == 'ASC' ? 'DESC' : 'ASC');
}

</script>

<style scoped>
  .reminders {
    @apply flex-1 flex flex-col gap-2 my-3 px-4 py-2 overflow-y-scroll;
  }
</style>