import schedule from 'node-schedule';
import { Notification } from 'electron';

export class TaskScheduler {
  constructor() {}

  initTasks(tasks = []) {
    tasks.forEach(task => {
      if (task.date) {
        this.scheduleTask(task);
      }
    });
  }

  scheduleTask(task) {
    if (task.isRecurrent) {
      const taskDate = new Date(task.date);

      const rule = new schedule.RecurrenceRule();
      rule.dayOfWeek = [new schedule.Range(1, 5)];
      rule.hour = taskDate.getHours();
      rule.minute = taskDate.getMinutes();

      schedule.scheduleJob(task.uuid, rule, () => {
        new Notification({
          title: `Task "${task.name}" is due!`,
          body: task.description,
          silent: false,
        }).show();
      });
    } else {
      schedule.scheduleJob(task.uuid, task.date, () => {
        new Notification({
          title: `Task "${task.name}" is due!`,
          body: task.description,
          silent: false,
        }).show();
      });
    }
  }

  cancelTask({ uuid }) {
    schedule.cancelJob(uuid);
  }
}
