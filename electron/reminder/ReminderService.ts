import { reminderScheduler } from "./ReminderScheduler";
import { reminderRepository } from "./ReminderRepository";
import { Reminder } from "../../shared/models/Reminder";

class ReminderService {
  init() {
    reminderScheduler.init(reminderRepository.getAll());
  }
  
  getAll() {
    return reminderRepository.getAll();
  }

  create(reminder: Reminder) {
    reminderRepository.create(reminder);
    if (reminder.date) {
      reminderScheduler.schedule(reminder);
    }
  }

  edit(reminder: Reminder) {
    // todo
  }

  delete(reminderId: string) {
    reminderScheduler.cancel(reminderId);
    return reminderRepository.delete(reminderId);
  }
}

export const reminderService = new ReminderService();