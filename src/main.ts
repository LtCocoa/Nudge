import { createApp } from 'vue';
import { createPinia } from 'pinia'

import App from './App.vue';

import './variables.css';
import './main.css';
import { reminderApi } from './api/reminder.js';

const pinia = createPinia();

reminderApi.registerEventHandlers();

createApp(App)
  .use(pinia)
  .mount('#app');
