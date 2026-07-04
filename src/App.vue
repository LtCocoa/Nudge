<template>
  <div class="h-full w-full bg-standart flex flex-col overflow-hidden">
    <div class="flex justify-start bg-darker">
      <div
        v-for="(view, viewIndex) in views"
        :key="viewIndex"
        class="view-selector p-4 text-xl hover:bg-sky-600 hover:text-slate-100"
        :class="{ 'view-selector-active': currentView == view.component }"
        @click="switchView(viewIndex)"
      >
        {{ view.title }}
      </div>
    </div>

    <div class="flex flex-col flex-1 overflow-auto p-4">
      <component :is="currentView" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from './stores/Store';
import ListView from './views/ListView.vue';
import CalendarView from './views/CalendarView.vue';
import { shallowRef } from 'vue';

const views = [
  {
    component: ListView,
    title: 'Reminders',
  },
  {
    component: CalendarView,
    title: 'Calendar'
  },
] as const;

const store = useAppStore();
const currentView = shallowRef(ListView);

function switchView(index: number) {
  currentView.value = views[index].component;
}

store.getAppData();

</script>

<style>
.view-selector {
  transition: background-color .1s ease-in-out;
  cursor: pointer;
  user-select: none;
}

.view-selector-active {
  background-color: rgb(0, 135, 202);
  color: rgb(238, 242, 247);
}
</style>
