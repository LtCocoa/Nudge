import schedule from 'node-schedule';
import { Notification } from 'electron';

export class ReminderScheduler {
  constructor() {}

  initReminders(reminders = []) {
    reminders.forEach(reminder => {
      if (reminder.date) {
        this.scheduleReminder(reminder);
      }
    });
  }

  scheduleReminder(reminder) {
    console.log(reminder);
    if (reminder.isRecurrent) {
      const reminderDate = new Date(reminder.date);

      const rule = new schedule.RecurrenceRule();
      rule.dayOfWeek = [new schedule.Range(1, 5)];
      rule.hour = reminderDate.getHours();
      rule.minute = reminderDate.getMinutes();

      schedule.scheduleJob(reminder.uuid, rule, () => {
        new Notification({
          title: reminder.title,
          body: reminder.description,
          silent: false,
        }).show();
      });
    } else {
      schedule.scheduleJob(reminder.uuid, reminder.date, () => {
        new Notification({
          title: reminder.title,
          body: reminder.description,
          silent: false,
        }).show();
      });
    }
  }

  cancelReminder({ uuid }) {
    schedule.cancelJob(uuid);
  }
}
