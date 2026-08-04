<template>
  <div class="app-wrapper">
    <div class="app-sidebar">
      <div class="app-logo-wrapper select-none">
        <div class="app-logo">
          <div class="app-logo-icon w-8 h-8">
            <img :src="logo" draggable="false">
          </div>
          <div class="app-logo-title">Nudge</div>
        </div>
      </div>

      <div class="mt-3" >
        <CreateReminderButton />
      </div>

      <div class="filter-list">
        <div
          class="filter-item"
          :class="{
            active: appStore.currentFilter === filterItem.filter,
          }"
          v-for="(filterItem, index) in filterItems"
          :key="index"
          @click="appStore.setFilter(filterItem.filter)"
        >
          <component :is="filterItem.icon" />
          <span class="filter-item-title">{{ filterItem.title }}</span>
          <span class="filter-item-count">{{ filterItem.count }}</span>
        </div>
      </div>
    </div>

    <div class="app-content">
      <ListView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ReminderFilter, useAppStore } from './stores/appStore';
import ListView from './views/ListView.vue';
import CreateReminderButton from './components/CreateReminderButton.vue';
import logo from './assets/logo.png';
import {
  type LucideIcon,
  CalendarClock,
  CalendarDays,
  CalendarSync,
  CalendarCheck2
} from '@lucide/vue';
import { computed } from 'vue';
import { getTimeToNextDay } from './utils';

const appStore = useAppStore();

appStore.getReminders();

const updateCurrentDate = () => {
  appStore.updateCurrentDate();

  setTimeout(() => {
    updateCurrentDate();
  }, getTimeToNextDay());
}

updateCurrentDate();

interface ReminderFilterItem {
  title: string;
  filter: ReminderFilter,
  count: number,
  icon: LucideIcon,
}

const filterItems = computed<ReminderFilterItem[]>(() => [
  {
    title: ReminderFilter[ReminderFilter.Today],
    filter: ReminderFilter.Today,
    count: appStore.today.length,
    icon: CalendarClock,
  },
  {
    title: ReminderFilter[ReminderFilter.Upcoming],
    filter: ReminderFilter.Upcoming,
    count: appStore.upcoming.length,
    icon: CalendarDays,
  },
  // {
  //   title: ReminderFilter[ReminderFilter.Repeating],
  //   filter: ReminderFilter.Repeating,
  //   count: appStore.repeating.length,
  //   icon: CalendarSync,
  // },
  {
    title: ReminderFilter[ReminderFilter.Expired],
    filter: ReminderFilter.Expired,
    count: appStore.expired.length,
    icon: CalendarCheck2,
  }
]);
</script>

<style scoped>
.app-wrapper {
  @apply h-full w-full flex overflow-hidden;

  .app-sidebar {
    @apply flex-shrink-0 basis-64 p-6 bg-background-soft border-r;

    .app-logo-wrapper {
      @apply mb-4;

      .app-logo {
        @apply flex flex-row gap-2 items-center;

        .app-logo-title {
          @apply text-2xl font-bold;
        }
      }
    }
    .filter-list {
      @apply flex flex-col gap-1 mt-5 select-none;

      .filter-item {
        @apply flex gap-3 p-2 hover:bg-primary-soft rounded-md cursor-pointer transition-colors text-text-secondary hover:text-primary-strong font-semibold;

        .filter-item-count {
          @apply ml-auto bg-background-soft px-2 rounded-lg;
        }
      }

      .filter-item.active {
        @apply bg-primary-soft text-primary-strong;
      }
    }
  }

  .app-content {
    @apply flex flex-1 p-6;
  }
}
</style>