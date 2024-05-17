import { defineStore } from "pinia";
import {
  readAppDataFile,
  saveAppData,
  scheduleTask
} from "../utils";


export const useAppStore = defineStore('app', {
  state: () => ({
    tasks: []
  }),
  getters: {
    sortedTasks: (state) => {
      return state.tasks.sort((taskA, taskB) => new Date(taskA.date) - new Date(taskB.date));
    }
  },
  actions: {
    async getAppData() {
      const { tasks } = await readAppDataFile();
      this.tasks = tasks;
    },
    addTask(task) {
      this.tasks.push(task);

      if (task.date) {
        scheduleTask(task);
      }

      saveAppData({ tasks: this.tasks });
    },
    deleteTask(task) {
      this.tasks = this.tasks.filter(({ uuid }) => uuid != task.uuid);
      saveAppData({ tasks: this.tasks });
    }
  }
});
