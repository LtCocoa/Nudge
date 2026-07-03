import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'fs';
import { session } from 'electron';
import { initAppData } from '../src/utils';
import { ReminderScheduler } from './ReminderScheduler';
import { reminderRepository } from './ReminderRepository';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_NAME = 'Scheduler';

app.setAppUserModelId(APP_NAME);

process.env.APP_ROOT = path.join(__dirname, '..');

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

const pathToIcon = path.join(`${process.env.APP_ROOT}/src/assets`, 'alarm_clock.png');

let win;
let tray;

const reminderScheduler = new ReminderScheduler();

const closeApplication = () => {
  if (process.platform !== 'darwin') {
    app.exit();
  }
};

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 900,
    icon: pathToIcon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString());
  });

  ipcMain.handle('save-reminders', (event, json) => {
    reminderRepository.saveReminders(json);
  });

  ipcMain.handle('get-reminders', () => {
    return reminderRepository.getReminders();
  });

  ipcMain.on('schedule-reminder', (a, reminder) => {
    console.log(a, reminder);
    reminderScheduler.scheduleReminder(reminder);
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  win.on('close', (event) => {
    event.preventDefault();
    win.hide();
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', closeApplication);

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\''],
      }
    })
  });

  const { reminders } = [];
  reminderScheduler.initReminders(reminders);

  tray = new Tray(pathToIcon);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Quit', type: 'normal', click: closeApplication }
  ]);

  tray.setToolTip(APP_NAME);
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    win.show();
  });

  createWindow();
});
