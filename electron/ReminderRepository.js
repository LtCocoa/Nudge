import Store from 'electron-store';

class ReminderRepository {
  store = null;

  constructor() {
    this.store = new Store();
  }

  saveReminders(reminders) {
    this.store.set('reminders', JSON.stringify(reminders));
  }

  getReminders() {
    const reminders = this.store.get('reminders');
    if (!reminders) {
      this.store.set('reminders', []);
      return [];
    }
    return JSON.parse(reminders);
  }
}

export const reminderRepository = Object.freeze(new ReminderRepository());
