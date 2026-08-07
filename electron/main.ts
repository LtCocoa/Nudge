import { app, BrowserWindow, Menu } from 'electron/main';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { session } from 'electron';
import { registerReminderHandlers } from './ipc/reminder';
import { logger } from './Logger';
import { ReminderService } from './reminder/ReminderService';
import { NotificationService } from './notification/NotificationService';
import { TrayService } from './tray/TrayService';
import { ReminderScheduler } from './reminder/ReminderScheduler';

const APP_NAME = 'Nudge';
const APP_ID = 'dev.ltcocoa.nudge';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, '..');
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

app.setAppUserModelId(APP_ID);

const pathToIcon = path.join(process.env.APP_ROOT, 'electron', 'assets', 'icon.ico');

let trayService: TrayService;
let notificationService: NotificationService;
let reminderService: ReminderService;

registerProcessHandlers();

function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 900,
    icon: pathToIcon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });

  if (VITE_DEV_SERVER_URL) {
    window.loadURL(VITE_DEV_SERVER_URL);
  } else {
    window.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  window.on('close', (event) => {
    event.preventDefault();
    window.hide();
  });

  window.setMenu(null);
  window.webContents.openDevTools();

  return window;
}

registerAppHandlers();

app.whenReady().then(() => {
  logger.log('App started');
  
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\''],
      }
    })
  });

  const window = createWindow();
  initServices(window);
  registerReminderHandlers(reminderService);
});

function closeApplication() {
  logger.log('App closed');

  if (process.platform !== 'darwin') {
    app.exit();
  }
};

function initServices(window: BrowserWindow) {
  if (!app.isReady()) throw new Error('Can not initialize services before app is ready');

  trayService = new TrayService(
    window,
    pathToIcon,
    APP_NAME,
    Menu.buildFromTemplate([
      { label: 'Quit', type: 'normal', click: closeApplication }
    ]),
  );

  notificationService = new NotificationService(window);
  const schedulerService = new ReminderScheduler(notificationService);
  reminderService = new ReminderService(schedulerService);
}

function registerAppHandlers() {
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
}

function registerProcessHandlers() {
  process.on('uncaughtException', (err) => {
    logger.error(err.stack ?? String(err));
  });

  process.on('unhandledRejection', (err) => {
    logger.error(String(err));
  });
}