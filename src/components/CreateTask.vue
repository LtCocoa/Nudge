<template>
  <div class="flex flex-col text-xl">
    <label for="task-name">Task name:</label>
    <input
      id="task-name"
      v-model="task.name"
      class="input"
      type="text"
    >

    <label for="task-description">Task description:</label>
    <input
      id="task-description"
      v-model="task.description"
      class="input"
      type="text"
    >

    <label for="task-schedule">Task schedule:</label>
    <input
      id="task-schedule"
      v-model="task.date"
      class="input"
      type="datetime-local"
    >

    <button
      type="button"
      class="btn mt-10"
      @click="onAddTaskClick"
    >
      Add
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Task } from '../data/Task';
import { useAppStore } from '../stores/Store';


const store = useAppStore();
const task = ref(new Task());

const onAddTaskClick = () => {
  store.addTask(task.value);
  task.value = new Task();
};

</script>
