import { createApp } from 'vue';
import { createPinia } from 'pinia'

import App from './App.vue';
import { router } from './router';

import './main.css';

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app').$nextTick(() => {
    // Use contextBridge
    window.ipcRenderer.on('main-process-message', (_event, message) => {
      console.log(message)
    });
});
