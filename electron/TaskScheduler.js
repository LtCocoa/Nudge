import schedule from 'node-schedule';
import { Notification } from 'electron';

export class TaskScheduler {
  constructor(task) {
    this.job = schedule.scheduleJob(task.date, () => {
      new Notification({ title: `Task "${task.name}" is due!`, body: task.description }).show();
    });
  }
}
