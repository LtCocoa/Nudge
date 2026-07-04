import schedule from 'node-schedule';
import { Notification } from 'electron';

class ReminderScheduler {
  init(reminders = []) {
    reminders.forEach(reminder => {
      if (reminder.date) {
        this.schedule(reminder);
      }
    });
  }

  schedule(reminder) {
    let spec;

    if (reminder.isRecurrent) {
      const reminderDate = new Date(reminder.date);

      spec = new schedule.RecurrenceRule();
      spec.dayOfWeek = [new schedule.Range(1, 5)];
      spec.hour = reminderDate.getHours();
      spec.minute = reminderDate.getMinutes();
    } else {
      spec = reminder.date;
    }

    schedule.scheduleJob(reminder.id, spec, () => {
      new Notification({
        title: reminder.title,
        body: reminder.description,
        silent: false,
      }).show();
    });
  }

  cancel(reminderId) {
    schedule.cancelJob(reminderId);
  }
}

export const reminderScheduler = new ReminderScheduler();
