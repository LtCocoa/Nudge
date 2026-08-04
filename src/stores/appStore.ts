import { defineStore } from "pinia";
import { rendererReminderApi } from "../api/reminder";
import { Reminder } from "../../shared/models/Reminder";
import { isExpired, isToday, isUpcoming } from "../utils";

export enum ReminderFilter {
  Today = 'Today',
  Upcoming = 'Upcoming',
  Repeating = 'Repeating',
  Expired = 'Expired',
}

interface State {
  reminders: Reminder[];
  currentFilter: ReminderFilter;
  isLoading: boolean;
  currentDate: Date,
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    reminders: [],
    currentFilter: ReminderFilter.Today,
    isLoading: false,
    currentDate: new Date(),
  }),
  getters: {
    sortedByDateAsc: (state) => {
      return state.reminders.sort((a, b) => {
        if (!a.date) return -1;
        if (!b.date) return 1;
        return Number(new Date(a.date)) - Number(new Date(b.date))
      });
    },
    today(): Reminder[] {
      this.currentDate;
      
      const reminders = this.reminders.filter(reminder => {
        if (!reminder.date) return false;

        return isToday(new Date(reminder.date));
      });
      return reminders;
    },
    upcoming(): Reminder[] {
      this.currentDate;

      return this.reminders.filter(reminder => {
        if (!reminder.date) return false;

        return isUpcoming(new Date(reminder.date));
      });
    },
    repeating(): Reminder[] {
      return this.reminders.filter(reminder => reminder.isRecurrent);
    },
    expired(): Reminder[] {
      this.currentDate;

      return this.reminders.filter(reminder => {
        if (!reminder.date) return false;

        return isExpired(new Date(reminder.date));
      });
    },
    filteredReminders(): Reminder[] {
      switch (this.currentFilter) {
        case ReminderFilter.Today:
          return this.today;
        case ReminderFilter.Upcoming:
          return this.upcoming;
        case ReminderFilter.Repeating:
          return this.repeating;
        case ReminderFilter.Expired:
          return this.expired;
        default:
          return this.reminders;
      }
    }
  },
  actions: {
    async getReminders() {
      try {
        this.isLoading = true;
        this.reminders = await rendererReminderApi.getAll();
      } catch(err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    async createReminder(reminder: Reminder) {
      await rendererReminderApi.create(reminder);
      this.reminders.push(reminder); // должно быть выполнено после сохранения в JSON
    },
    async deleteReminder(reminder: Reminder) {
      const deleted = await rendererReminderApi.delete(reminder.id);
      if (deleted) {
        const index = this.reminders.findIndex(reminder => reminder.id === deleted.id);
        this.reminders.splice(index, 1);
      }
    },
    setFilter(filter: ReminderFilter) {
      this.currentFilter = filter;
    },
    updateCurrentDate() {
      this.currentDate = new Date();
    }
  }
});
