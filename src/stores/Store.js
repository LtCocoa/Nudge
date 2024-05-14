import { defineStore } from "pinia";
import {
  readAppDataFile,
  saveAppData,
  showNotification,
  scrollElementIntoView,
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

      // TODO: возможно стоит перенести в электрон
      showNotification(
        {
          title: `Created new task: ${task.name}`,
          body: task.description
        },
        () => scrollElementIntoView(task.uuid)
      );

      if (task.date) {
        scheduleTask(task);
      }

      saveAppData({ tasks: this.tasks });
    }
  }
});
