<template>
  <div class="flex flex-col text-xl gap-2">
    <label for="task-name">Name:</label>
    <input
      id="task-name"
      v-model="task.name"
      class="input"
      type="text"
    >

    <label for="task-description">Description:</label>
    <textarea
      id="task-description"
      v-model="task.description"
      class="input max-h-60"
      type="text"
    />

    <label for="task-schedule">Schedule:</label>
    <input
      id="task-schedule"
      v-model="task.date"
      class="input"
      type="datetime-local"
    >

    <div>
      <input
        id="task-recurrency"
        v-model="task.isRecurrent"
        class="input"
        type="checkbox"
      >
      <label
        for="task-recurrency"
        class="ml-2"
      >Recurrent</label>
    </div>

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

const emit = defineEmits(['created']);

const store = useAppStore();
const task = ref(new Task());

const onAddTaskClick = () => {
  store.addTask(task.value);
  task.value = new Task();
  emit('created');
};

</script>
