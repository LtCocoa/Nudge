import { defineStore } from "pinia";
import { reminderApi } from "../api/reminder";
import { Reminder } from "../../shared/models/Reminder";

interface State {
  reminders: Reminder[];
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    reminders: []
  }),
  getters: {
    sorted: (state) => {
      return state.reminders.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
    },
    allCount: (state) => {
      return state.reminders.length;
    },
    thisDay: (state) => {
      return state.reminders.filter(reminder => {
        if (!reminder.date) return false;
        const dateStart = new Date(reminder.date);
        dateStart.setHours(0, 0, 0, 0);
        const dateEnd = new Date(reminder.date);
        dateEnd.setHours(23, 59, 59, 59);

        return reminder.date > dateStart && reminder.date < dateEnd;
      });
    }
  },
  actions: {
    async getAppData() {
      this.reminders = await reminderApi.getAll();
    },
    createReminder(reminder: Reminder) {
      this.reminders.push(reminder); // должно быть выполнено после сохранения в JSON

      reminderApi.create(reminder);
    },
    async deleteReminder(reminder: Reminder) {
      const deleted = await reminderApi.delete(reminder.id);
      if (deleted) {
        const index = this.reminders.findIndex(reminder => reminder.id === deleted.id);
        this.reminders.splice(index, 1);
      }
    }
  }
});
