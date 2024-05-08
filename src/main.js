import { createApp } from 'vue';
import { createPinia } from 'pinia'

import App from './App.vue';
import { router } from './router';
import { useAppStore } from './stores/Store';

import './style.css';

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


router.beforeEach((to, from) => {
  if (useAppStore().currentProfile == null && to.name == 'profile') {
    return { name: 'profiles' };
  }
});
