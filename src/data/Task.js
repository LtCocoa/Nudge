import { v4 as uuid } from "uuid";

export class Task {
  constructor(params) {
    this.uuid = uuid();
    this.name = params?.name || '';
    this.description = params?.description || '';
  }
}
