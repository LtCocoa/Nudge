import { app, BrowserWindow, Tray, Menu } from 'electron/main';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { session } from 'electron';
import { reminderService } from './reminder/ReminderService';
import { registerReminderHandlers } from './ipc/reminder';
import { notificationService } from './notification/NotificationService';
import { logger } from './Logger';

const APP_NAME = 'Nudge';
const APP_ID = 'dev.ltcocoa.nudge';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.setAppUserModelId(APP_ID);

process.env.APP_ROOT = path.join(__dirname, '..');

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

const pathToIcon = path.join(process.env.APP_ROOT, 'electron', 'assets', 'icon.ico');

let win: BrowserWindow;
let tray: Tray;

process.on('uncaughtException', (err) => {
  logger.error(err.stack ?? String(err));
});

process.on('unhandledRejection', (err) => {
  logger.error(String(err));
});

const closeApplication = () => {
  logger.log('App closed');

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

  notificationService.setWindow(win);

  registerReminderHandlers();

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  win.on('close', (event) => {
    event.preventDefault();
    win.hide();
  });

  win.setMenu(null);
  win.webContents.openDevTools();
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
  logger.log('App started');

  app.setLoginItemSettings({
    openAtLogin: true,
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\''],
      }
    })
  });

  reminderService.init();

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
