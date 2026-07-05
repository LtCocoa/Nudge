import { toRaw } from "vue";
import { Reminder } from "../../shared/models/Reminder";

class ReminderApi {
  getAll() {
    return window.reminders.getAll();
  }
  create(reminder: Reminder) {
    return window.reminders.save(toRaw(reminder));
  }
  update(reminder: Reminder) {
    return window.reminders.edit(toRaw(reminder));
  }
  delete(reminderId: string) {
    return window.reminders.delete(reminderId);
  }
}

export const reminderApi = new ReminderApi();