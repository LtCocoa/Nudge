import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
});

contextBridge.exposeInMainWorld('reminders', {
  'save': (reminder) => {
    return ipcRenderer.invoke('save-reminder', reminder);
  },
  'edit': (reminder) => {
    return ipcRenderer.invoke('edit-reminder', reminder);
  },
  'delete': (reminderId) => {
    return ipcRenderer.invoke('delete-reminder', reminderId);
  },
  'getAll': () => {
    return ipcRenderer.invoke('get-reminders');
  }
});
