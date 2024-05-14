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
    }
  }
});
