<template>
  <div class="h-full w-full bg-standart flex flex-col overflow-hidden">
    <div class="flex justify-start bg-darker">
      <RouterLink
        to="/tasks"
        class="nav-link p-4 text-xl hover:bg-sky-600 hover:text-slate-100"
      >
        Tasks
      </RouterLink>

      <RouterLink
        to="/calendar"
        class="nav-link p-4 text-xl hover:bg-sky-600 hover:text-slate-100"
      >
        Calendar
      </RouterLink>
    </div>

    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <div class="flex flex-col flex-1 overflow-auto p-4">
            <component :is="Component" />
          </div>
          <template #fallback>
            loading...
          </template>
        </Suspense>
      </template>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from './stores/Store';
import { useRouter } from 'vue-router';

const store = useAppStore();
const router = useRouter();

store.getAppData().then(() => {
  router.push({ name: 'tasks' });
});

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
