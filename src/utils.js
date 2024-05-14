import { toRaw } from "vue";

export const saveAppData = (data) => {
  return window.filesystem.saveFile(JSON.stringify(data));
}

export const readAppDataFile = () => {
  return window.filesystem.readFile();
}

export const scheduleTask = (task) => {
  window.tasks.scheduleTask(toRaw(task));
}

export const initAppData = () => {
  return {
    tasks: [],
  }
}

export const showNotification = (params = { title: 'Default title', body: 'default body' }, onclick = null) => {
  new window.Notification(params.title, { body: params.body }).onclick = onclick;
}

export const scrollElementIntoView = (id) => {
  document.getElementById(id).scrollIntoView();
}
