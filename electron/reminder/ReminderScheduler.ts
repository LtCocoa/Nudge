import schedule from 'node-schedule';
import { Notification } from 'electron';
import { Reminder } from '../../shared/models/Reminder';

class ReminderScheduler {
  init(reminders: Reminder[] = []) {
    reminders.forEach(reminder => {
      if (reminder.date) {
        this.schedule(reminder);
      }
    });
  }

  schedule(reminder: Reminder) {
    let spec: schedule.Spec;

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

  cancel(reminderId: string) {
    schedule.cancelJob(reminderId);
  }
}

export const reminderScheduler = new ReminderScheduler();
