<template>
  <div class="h-full w-full bg-standart flex flex-col overflow-hidden">
    <div class="flex justify-start bg-darker">
      <RouterLink
        to="/"
        exact
        class="nav-link p-4 text-xl hover:bg-sky-600 hover:text-slate-100"
      >
        Profiles
      </RouterLink>
      <RouterLink
        to="/create-profile"
        class="nav-link p-4 text-xl hover:bg-sky-600 hover:text-slate-100"
      >
        Create profile
      </RouterLink>
      <RouterLink
        to="/profile"
        class="nav-link p-4 text-xl hover:bg-sky-600 hover:text-slate-100"
      >
        Profile
      </RouterLink>
      <div
        v-if="store.currentProfile"
        class="ml-auto p-4 flex justify-center items-center"
      >
        {{ store.currentProfile.name }}
      </div>
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

<script setup>
import { useAppStore } from './stores/Store';


const store = useAppStore();
store.getProfiles();

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
