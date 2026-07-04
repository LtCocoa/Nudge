import { Reminder } from "../../shared/models/Reminder";

export type CreateReminder = Omit<Reminder, 'id'>;