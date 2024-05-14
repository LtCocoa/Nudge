import { createRouter, createMemoryHistory } from 'vue-router';
import TaskList from './components/TaskList.vue';

const routes = [
  {
    path: '/tasks',
    name: 'tasks',
    component: TaskList,
  }
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
