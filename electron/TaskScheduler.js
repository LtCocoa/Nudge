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
    schedule.scheduleJob(task.uuid, task.date, () => {
      new Notification({ title: `Task "${task.name}" is due!`, body: task.description }).show();
    });
  }

  cancelTask({ uuid }) {
    schedule.cancelJob(uuid);
  }
}
