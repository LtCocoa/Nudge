import { defineStore } from "pinia";
import { reminderApi } from "../api/reminder";
import { Reminder } from "../../shared/models/Reminder";

interface State {
  reminders: Reminder[];
}

function isToday(date: Date) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 59);

  return date > todayStart && date < todayEnd;
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    reminders: []
  }),
  getters: {
    sortedByDateAsc: (state) => {
      return state.reminders.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
    },
    today: (state) => {
      return state.reminders.filter(reminder => {
        if (!reminder.date) return false;

        return isToday(new Date(reminder.date));
      });
    },
    upcoming: (state) => {
      return state.reminders.filter(reminder => {
        if (!reminder.date) return false;

        return !isToday(new Date(reminder.date));
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
