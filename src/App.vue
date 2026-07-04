<template>
  <div class="h-full w-full bg-standart flex flex-col overflow-hidden">
    <div class="flex justify-start bg-darker">
      <div
        class="nav-link p-4 text-xl hover:bg-sky-600 hover:text-slate-100"
        @click="switchView('list')"
      >
        Tasks
      </div>

      <div
        class="nav-link p-4 text-xl hover:bg-sky-600 hover:text-slate-100"
        @click="switchView('calendar')"
      >
        Calendar
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

const APP_VIEWS = {
  list: ListView,
  calendar: CalendarView,
} as const;

const store = useAppStore();
const currentView = shallowRef(ListView);

function switchView(view: keyof typeof APP_VIEWS) {
  currentView.value = APP_VIEWS[view];
}

store.getAppData();

</script>

<style>
.nav-link {
  transition: background-color .1s ease-in-out;
}

.router-link-active {
  background-color: rgb(0, 135, 202);
  color: rgb(238, 242, 247);
}
</style>
