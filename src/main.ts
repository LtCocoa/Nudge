import { createApp } from 'vue';
import { createPinia } from 'pinia'

import App from './App.vue';

import './main.css';
import './variables.css';

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .mount('#app');
