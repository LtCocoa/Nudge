export interface Reminder {
  id: string;
  title: string;
  description: string;
  date: Date | null;
  isRecurrent: boolean;
}

export interface TodoReminder extends Reminder {
  completed: boolean;
}

export interface RecurrentReminder extends Reminder {
  dates: Date[],
}

export interface ReminderWithDates extends Reminder {
  dates: [],
}