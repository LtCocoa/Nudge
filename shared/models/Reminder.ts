export interface Reminder {
  id: string;
  title: string;
  description: string;
  date: Date | null;
  isRecurrent: boolean;
}
