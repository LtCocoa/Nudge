import { ipcRenderer, contextBridge } from 'electron';
import { Reminder } from '../shared/models/Reminder';

contextBridge.exposeInMainWorld('reminders', {
  'save': (reminder: Reminder) => {
    return ipcRenderer.invoke('save-reminder', reminder);
  },
  'edit': (reminder: Reminder) => {
    return ipcRenderer.invoke('edit-reminder', reminder);
  },
  'delete': (reminderId: string) => {
    return ipcRenderer.invoke('delete-reminder', reminderId);
  },
  'getAll': () => {
    return ipcRenderer.invoke('get-reminders');
  }
});
