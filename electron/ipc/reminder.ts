import { ipcMain } from "electron";
import { reminderService } from "../reminder/ReminderService";

export function registerReminderHandlers() {
  ipcMain.handle('get-reminders', () => {
    return reminderService.getAll();
  });

  ipcMain.handle('save-reminder', (_, reminder) => {
    reminderService.create(reminder);
  });

  ipcMain.handle('edit-reminder', (_, reminder) => {
    reminderService.edit(reminder);
  });

  ipcMain.handle('delete-reminder', (_, reminderId) => {
    return reminderService.delete(reminderId);
  });
}