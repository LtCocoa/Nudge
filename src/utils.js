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

export const days = [
  {
    fullName: 'Понедельник',
    shortName: 'Пн'
  },
  {
    fullName: 'Вторник',
    shortName: 'Вт'
  },
  {
    fullName: 'Среда',
    shortName: 'Ср'
  },
  {
    fullName: 'Четверг',
    shortName: 'Чт'
  },
  {
    fullName: 'Пятница',
    shortName: 'Пт'
  },
  {
    fullName: 'Суббота',
    shortName: 'Сб'
  },
  {
    fullName: 'Воскресенье',
    shortName: 'Вc'
  },
];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getDaysInMonth = (year, month) => {
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  return lastDayOfMonth;
}

export const fillMonth = (
  year = new Date().getFullYear(),
  month = new Date().getMonth()
) => {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDay()
  
  const totalDaysLastMonth = getDaysInMonth(year, month - 1);
  const totalDaysMonth = getDaysInMonth(year, month);
  const totalDaysNextMonth = getDaysInMonth(year, month + 1);
  
  const prevMonthDays = firstDay - 1 > -1 ? firstDay - 1 : 6;
  const nextMonthDays = 7 - lastDay;

  const daysLastMonth = Array.from({ length: prevMonthDays }, (_, i) => totalDaysLastMonth - i).reverse().map(item => new Date(year, month - 1, item));
  const daysCurrentMonth = Array.from({ length: totalDaysMonth }, (_, i) => i + 1).map(item => new Date(year, month, item));
  const daysNextMonth = Array.from({ length: nextMonthDays }, (_, i) => i + 1).map(item => new Date(year, month + 1, item));

  const days = [...daysLastMonth, ...daysCurrentMonth, ...daysNextMonth];

  return days;
}
