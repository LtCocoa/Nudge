<template>
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
</template>

<script setup lang="ts">
import { CalendarCheck2, CalendarClock, CalendarDays, LucideIcon } from '@lucide/vue';
import { ReminderFilter, useAppStore } from '../stores/appStore';
import { computed } from 'vue';

interface ReminderFilterItem {
  title: string;
  filter: ReminderFilter,
  count: number,
  icon: LucideIcon,
}

const appStore = useAppStore();

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
</style>