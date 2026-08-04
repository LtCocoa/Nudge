import { Reminder } from "../../shared/models/Reminder"

declare global {
  interface Window {
    reminders: {
      getAll(): Promise<Reminder[]>;
      save(reminder: Reminder): void;
      edit(reminder: Reminder): void;
      delete(reminderId: string): Promise<Reminder>;
      onUpdateReminders(cb: () => void): void;
    }
  }
}

export {};