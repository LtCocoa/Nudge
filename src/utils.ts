import { Reminder } from "../shared/models/Reminder";
import { v4 as uuid } from "uuid";

export function createReminder(): Reminder {
  return {
    id: uuid(),
    title: '',
    description: '',
    date: null,
    isRecurrent: false,
  }
}

export const scrollElementIntoView = (id: string) => {
  document.getElementById(id)?.scrollIntoView();
}

export const formatTime = (rawDate: Date) => {
  const date = new Date(rawDate);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

export const formatDate = (rawDate: Date) => {
  const date = new Date(rawDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export const formatFullDate = (rawDate: Date) => {
  return `${formatDate(rawDate)} ${formatTime(rawDate)}`;
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

const getDaysInMonth = (year: number, month: number) => {
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  return lastDayOfMonth;
}

export const fillMonth = (
  year = new Date().getFullYear(),
  month = new Date().getMonth()
) => {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDay();

  const totalDaysLastMonth = getDaysInMonth(year, month - 1);
  const totalDaysMonth = getDaysInMonth(year, month);

  const prevMonthDays = firstDay - 1 > -1 ? firstDay - 1 : 6;
  const nextMonthDays = 7 - lastDay;

  const daysLastMonth = Array.from({ length: prevMonthDays }, (_, i) => totalDaysLastMonth - i).reverse().map(item => new Date(year, month - 1, item));
  const daysCurrentMonth = Array.from({ length: totalDaysMonth }, (_, i) => i + 1).map(item => new Date(year, month, item));
  const daysNextMonth = Array.from({ length: nextMonthDays }, (_, i) => i + 1).map(item => new Date(year, month + 1, item));

  const days = [...daysLastMonth, ...daysCurrentMonth, ...daysNextMonth];

  return days;
}

export function getDayRange(date: Date) {
  const todayStart = new Date(date);
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(date);
  todayEnd.setHours(23, 59, 59, 59);

  return [todayStart, todayEnd];
}

export function isToday(date: Date) {
  const [todayStart, todayEnd] = getDayRange(new Date());

  return date > todayStart && date < todayEnd;
}

export function isUpcoming(date: Date) {
  const [_, todayEnd] = getDayRange(new Date());

  return date > todayEnd;
}

export function isExpired(date: Date) {
  const [todayStart] = getDayRange(new Date());

  return date < todayStart;
}

export function getTimeToNextDay() {
  const midnight = new Date().setHours(24, 0, 0, 0);
  return midnight - Date.now();
}

export function debounce(fn: any, ms: number) {
  let timeoutId: NodeJS.Timeout | undefined;

  return (args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(args), ms);
  }
}

export function getReminderComparator(order: 'ASC' | 'DESC') {
  return (left: Reminder, right: Reminder) => {
    const [prevTitle, nextTitle] = [left.title.toLowerCase(), right.title.toLowerCase()];

    if (prevTitle == nextTitle) return 0;

    switch (order) {
      case 'ASC':
        if (prevTitle < nextTitle) return -1;
        return 1;
      case "DESC":
        if (prevTitle < nextTitle) return 1;
        return -1;
    }
  }
}