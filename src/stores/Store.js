import { defineStore } from "pinia";
import {
  getReminders,
  saveReminder,
  editReminder,
  deleteReminder,
} from "../utils";
import { toRaw } from "vue";

export const useAppStore = defineStore('app', {
  state: () => ({
    reminders: []
  }),
  getters: {
    sortedReminders: (state) => {
      return state.reminders.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  },
  actions: {
    async getAppData() {
      this.reminders = await getReminders();
    },
    addReminder(reminder) {
      this.reminders.push(reminder); // должно быть выполнено после сохранения в JSON

      saveReminder(reminder);
    },
    async deleteReminder(reminder) {
      const deleted = await deleteReminder(reminder.id);
      console.log(deleted);
      if (deleted) {
        this.reminders = this.reminders.filter(({ id }) => id != reminder.id);
      }
    }
  }
});
