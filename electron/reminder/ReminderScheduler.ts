import schedule from 'node-schedule';
import { Notification } from 'electron';
import { Reminder } from '../../shared/models/Reminder';
import { notificationService } from '../notification/NotificationService';

class ReminderScheduler {
  init(reminders: Reminder[] = []) {
    reminders.forEach(reminder => {
      if (reminder.date) {
        this.schedule(reminder);
      }
    });
  }

  schedule(reminder: Reminder) {
    if (!reminder.date) throw new Error('Reminder must have a date to schedule it');

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
      const notification = new Notification({
        title: reminder.title,
        body: reminder.description,
        silent: false,
      });

      // notification.on('click')

      // todo - открыть окно приложения и показать напоминалку по клику на уведомление
      notification.show();
      notificationService.toggleFlash(true);
    });
  }

  cancel(reminderId: string) {
    schedule.cancelJob(reminderId);
  }
}

export const reminderScheduler = new ReminderScheduler();
