<template>
  <div class="h-full w-full flex flex-col overflow-hidden">
    <div class="flex flex-col flex-1 overflow-auto p-4">
      <ListView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from './stores/Store';
import ListView from './views/ListView.vue';

const store = useAppStore();

store.getAppData();

</script>
