import { defineStore } from "pinia";
import {
  getReminders,
  saveReminders,
  scheduleReminder
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
      this.reminders.push(reminder);

      if (reminder.date) {
        scheduleReminder(toRaw(reminder));
      }

      saveReminders(toRaw(this.reminders));
    },
    deleteReminder(reminder) {
      this.reminders = this.reminders.filter(({ id }) => id != reminder.id);
      saveReminders(toRaw(this.reminders));
    }
  }
});
