import { reminderScheduler } from "./ReminderScheduler";
import { reminderRepository } from "./ReminderRepository";

class ReminderService {
  init() {
    reminderScheduler.init(reminderRepository.getAll());
  }
  
  getAll() {
    return reminderRepository.getAll();
  }

  create(reminder) {
    reminderRepository.create(reminder);
    reminderScheduler.schedule(reminder);
  }

  edit(reminder) {
    // todo
  }

  delete(reminderId) {
    reminderScheduler.cancel(reminderId);
    return reminderRepository.delete(reminderId);
  }
}

export const reminderService = new ReminderService();