import Store from 'electron-store';

class ReminderRepository {
  store = new Store();

  create(reminder) {
    this.store.appendToArray('reminders', reminder);
  }

  edit(reminder) {

  }

  delete(reminderId) {
    const reminders = this.getAll();
    const index = reminders.findIndex(reminder => reminder.id == reminderId);
    const [removed] = reminders.splice(index, 1);

    this.saveAll(reminders);

    return removed;
  }

  saveAll(reminders) {
    this.store.set('reminders', reminders);
  }

  getAll() {
    const reminders = this.store.get('reminders');
    if (!reminders) {
      this.store.set('reminders', []);
      return [];
    }
    return reminders;
  }
}

export const reminderRepository = Object.freeze(new ReminderRepository());
