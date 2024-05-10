<template>
  <div class="bg-standart flex flex-col text-xl gap-3 rounded-lg h-full">
    <div class="flex flex-col gap-2 rounded">
      <label for="name">Profile name:</label>

      <input
        id="name"
        v-model="userName"
        type="text"
        class="input"
      >
    </div>

    <button
      type="button"
      class="btn mt-auto"
      @click="onClick"
    >
      Add
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '../stores/Store';
import { useRouter } from 'vue-router';
import { UserProfile } from '../data/UserProfile';

const store = useAppStore();
const router = useRouter();

const userName = ref('');

const onClick = async () => {
  const profile = new UserProfile({
    name: userName.value,
  });
  await store.createNewProfile(profile);
  router.push({ name: 'profiles' });
}

</script>
