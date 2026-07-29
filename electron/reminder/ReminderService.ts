import { reminderScheduler } from "./ReminderScheduler";
import { reminderRepository } from "./ReminderRepository";
import { Reminder } from "../../shared/models/Reminder";
import { logger } from "../Logger";

class ReminderService {
  init() {
    reminderScheduler.init(reminderRepository.getAll());
  }
  
  async getAll() {
    try {
      const reminders = await reminderRepository.getAll();
      logger.log(`Loaded ${reminders.length} reminders`);
      return reminders;
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message);
      }

      return [];
    }
  }

  create(reminder: Reminder) {
    try {
      reminderRepository.create(reminder);
      logger.log(`Created new reminder ${reminder.id}`);

      if (reminder.date) {
        reminderScheduler.schedule(reminder);
        logger.log(`Scheduled reminder ${reminder.id}`);
      }

    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
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