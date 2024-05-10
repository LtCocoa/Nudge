<template>
  <TaskList />
  <CreateTask class="mt-auto" />
</template>

<script setup>
import { useAppStore } from '../stores/Store';
import CreateTask from './CreateTask.vue';
import TaskList from './TaskList.vue';

const store = useAppStore();

</script>
