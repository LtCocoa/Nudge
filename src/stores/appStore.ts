import { defineStore } from "pinia";
import { rendererReminderApi } from "../api/reminder";
import { Reminder } from "../../shared/models/Reminder";
import { getReminderComparator, isExpired, isToday, isUpcoming } from "../utils";

export enum ReminderCategory {
  Today = 'Today',
  Upcoming = 'Upcoming',
  Repeating = 'Repeating',
  Expired = 'Expired',
}

interface State {
  reminders: Reminder[];
  currentCategory: ReminderCategory;
  isLoading: boolean;
  currentDate: Date;
  filter: string;
  sortOrder: 'ASC' | 'DESC';
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    reminders: [],
    currentCategory: ReminderCategory.Today,
    isLoading: false,
    currentDate: new Date(),
    filter: '',
    sortOrder: 'ASC',
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
    categorisedReminders(): Reminder[] {
      switch (this.currentCategory) {
        case ReminderCategory.Today:
          return this.today;
        case ReminderCategory.Upcoming:
          return this.upcoming;
        case ReminderCategory.Repeating:
          return this.repeating;
        case ReminderCategory.Expired:
          return this.expired;
        default:
          return this.reminders;
      }
    },
    filteredCategorisedReminders(): Reminder[] {
      const sorted = [...this.categorisedReminders]
        .sort(getReminderComparator(this.sortOrder));

      if (!this.filter) return sorted;

      const trimmedFilter = this.filter.trim();
      return sorted.filter(reminder => reminder.title.includes(trimmedFilter));
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
    setCategory(category: ReminderCategory) {
      this.currentCategory = category;
    },
    updateCurrentDate() {
      this.currentDate = new Date();
    },
    setFilter(filter: string) {
      this.filter = filter;
    },
    setSortTitle(title: 'ASC' | 'DESC') {
      this.sortOrder = title;
    }
  }
});
