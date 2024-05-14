import { createRouter, createMemoryHistory } from 'vue-router';
import ListView from './views/ListView.vue';
import CalendarView from './views/CalendarView.vue';

const routes = [
  {
    path: '/tasks',
    name: 'tasks',
    component: ListView,
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView
  }
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
