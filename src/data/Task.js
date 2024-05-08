import { v4 as uuid } from "uuid";

export class Task {
  constructor() {
    this.uuid = uuid();
    this.name = 'task_text';
    this.desription = '';
  }
}
