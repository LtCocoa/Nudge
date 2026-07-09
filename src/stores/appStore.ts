import { defineStore } from "pinia";
import { reminderApi } from "../api/reminder";
import { Reminder } from "../../shared/models/Reminder";

export enum ReminderFilter {
  Today = 'today',
  Upcoming = 'upcoming',
  Repeating = 'repeating',
  Completed = 'completed',
}

interface State {
  reminders: Reminder[];
  currentFilter: ReminderFilter;
  isLoading: boolean;
}

function getDayRange(date: Date) {
  const todayStart = new Date(date);
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(date);
  todayEnd.setHours(23, 59, 59, 59);

  return [todayStart, todayEnd];
}

function isToday(date: Date) {
  const [todayStart, todayEnd] = getDayRange(new Date());

  return date > todayStart && date < todayEnd;
}

function isUpcoming(date: Date) {
  const [_, todayEnd] = getDayRange(new Date());

  return date > todayEnd;
}

export const useReminderStore = defineStore('app', {
  state: (): State => ({
    reminders: [],
    currentFilter: ReminderFilter.Today,
    isLoading: false,
  }),
  getters: {
    sortedByDateAsc: (state) => {
      return state.reminders.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
    },
    today(): Reminder[] {
      const rems = this.reminders.filter(reminder => {
        if (!reminder.date) return false;

        return isToday(new Date(reminder.date));
      });
      return rems;
    },
    upcoming: (state) => {
      return state.reminders.filter(reminder => {
        if (!reminder.date) return false;

        return isUpcoming(new Date(reminder.date));
      });
    },
    repeating(): Reminder[] {
      return this.reminders.filter(reminder => reminder.isRecurrent);
    },
    filteredReminders(): Reminder[] {
      switch (this.currentFilter) {
        case ReminderFilter.Today:
          return this.today;
        case ReminderFilter.Upcoming:
          return this.upcoming;
        case ReminderFilter.Repeating:
          return this.repeating;
        default:
          return this.reminders;
      }
    }
  },
  actions: {
    async getReminders() {
      try {
        this.isLoading = true;
        this.reminders = await reminderApi.getAll();
      } catch(err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
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
    },
    setFilter(filter: ReminderFilter) {
      this.currentFilter = filter;
    }
  }
});
