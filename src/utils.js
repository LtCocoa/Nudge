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

export const formatDate = (rawDate) => {
  const date = new Date(rawDate);

  if (date == 'Invalid Date') {
    return '';
  }

  const addZero = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  const [
    day,
    month,
    year,
    hours,
    minutes,
  ] = [
    addZero(date.getDate()),
    addZero(date.getMonth()),
    date.getFullYear(),
    addZero(date.getHours()),
    addZero(date.getMinutes()),
  ];

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}