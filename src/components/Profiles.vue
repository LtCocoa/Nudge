<template>
  <div>
    <ul>
      <li
        v-for="profile in store.profiles"
        :key="profile.uuid"
        class="flex"
      >
        <p
          class="cursor-pointer"
          @click="onSelectProfile(profile.uuid)"
        >
          {{ profile.name }}
        </p>
        <i
          class="ml-auto cursor-pointer"
          @click="onDeleteProfile(profile.uuid)"
        >X</i>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useAppStore } from '../stores/Store';
import { useRouter } from 'vue-router';

const store = useAppStore();
const router = useRouter();

const onSelectProfile = (uuid) => {
  store.setCurrentProfile(uuid);
  router.push({ name: 'profile' });
}

const onDeleteProfile = (uuid) => {
  store.deleteProfile(uuid);
}

</script>


<style scoped>

</style>
