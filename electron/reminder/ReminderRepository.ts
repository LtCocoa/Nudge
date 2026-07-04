import Store from 'electron-store';
import { Reminder } from '../../shared/models/Reminder';

interface StoreSchema {
  reminders: Reminder[],
}

class ReminderRepository {
  store = new Store<StoreSchema>();

  create(reminder: Reminder) {
    this.store.appendToArray('reminders', reminder);
  }

  edit(reminder: Reminder) {

  }

  delete(reminderId: string) {
    const reminders = this.getAll();
    const index = reminders.findIndex(reminder => reminder.id === reminderId);
    const [removed] = reminders.splice(index, 1);

    this.saveAll(reminders);

    return removed;
  }

  saveAll(reminders: Reminder[]) {
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
