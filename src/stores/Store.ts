import { defineStore } from "pinia";
import {
  getReminders,
  saveReminder,
  editReminder,
  deleteReminder,
} from "../utils";
import { Reminder } from "../../shared/models/Reminder";

interface State {
  reminders: Reminder[];
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    reminders: []
  }),
  getters: {
    sortedReminders: (state) => {
      return state.reminders.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
    }
  },
  actions: {
    async getAppData() {
      this.reminders = await getReminders();
    },
    addReminder(reminder: Reminder) {
      this.reminders.push(reminder); // должно быть выполнено после сохранения в JSON

      saveReminder(reminder);
    },
    async deleteReminder(reminder: Reminder) {
      const deleted = await deleteReminder(reminder.id);
      console.log(deleted);
      if (deleted) {
        this.reminders = this.reminders.filter(({ id }) => id != reminder.id);
      }
    }
  }
});
