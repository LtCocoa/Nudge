import { ipcMain } from "electron";
import { ReminderService } from "../reminder/ReminderService";

export function registerReminderHandlers(reminderService: ReminderService) {
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