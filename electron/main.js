import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'fs';
import { session } from 'electron';
import { initAppData } from '../src/utils';
import { TaskScheduler } from './TaskScheduler';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_NAME = 'Scheduler';

app.setAppUserModelId(APP_NAME);

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

const pathToIcon = path.join(`${process.env.APP_ROOT}/src/assets`, 'alarm_clock.png');

let win;
let tray;

const taskScheduler = new TaskScheduler();

const getAppData = () => {
  try {
    const result = JSON.parse(fs.readFileSync('data/data.json', 'utf-8'));

    if (!result.tasks) {
      result = initAppData();
    }

    return result;
  } catch (error) {
    return initAppData();
  }
}

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

  // win.webContents.openDevTools();

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString());
  });

  ipcMain.handle('save-file', (event, json) => {
    return fs.writeFileSync('data/data.json', json);
  });

  ipcMain.handle('read-file', getAppData);

  ipcMain.on('schedule-task', (_, task) => {
    taskScheduler.scheduleTask(task);
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
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
  const { tasks } = getAppData();
  taskScheduler.initTasks(tasks);

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
