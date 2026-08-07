import schedule from 'node-schedule';
import { Notification } from 'electron';
import { Reminder } from '../../shared/models/Reminder';
import { type NotificationService } from '../notification/NotificationService';

export class ReminderScheduler {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  init(reminders: Reminder[] = []) {
    reminders.forEach(reminder => {
      if (reminder.date) {
        this.schedule(reminder);
      }
    });
  }

  schedule(reminder: Reminder) {
    if (!reminder.date) throw new Error(`Could not schedule reminder ${reminder.id} because it doesn't have a date`);

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

      // todo - открыть окно приложения и показать напоминалку по клику на уведомление
      notification.show();
      this.notificationService.toggleFlash(true);
    });
  }

  cancel(reminderId: string) {
    schedule.cancelJob(reminderId);
  }
}
