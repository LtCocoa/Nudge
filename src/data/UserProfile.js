import { v4 as uuid } from "uuid";

export class UserProfile {
  constructor(params) {
    this.uuid = uuid();
    this.name = params.name || null;
    this.tasks = params.tasks || [];
  }
}
