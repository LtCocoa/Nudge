import { v4 as uuid } from "uuid";

export class UserProfile {
  constructor(params) {
    this.id = uuid();
    this.name = params?.name || null;
    this.reminders = params?.reminders || [];
  }
}
