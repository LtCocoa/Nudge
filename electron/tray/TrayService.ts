import { Tray, type BrowserWindow } from "electron/main";

export class TrayService {
  private tray: Tray;

  constructor(
    private readonly window: BrowserWindow,
    pathToIcon: string,
    appName: string,
    contextMenu: Electron.Menu,
  ) {
    this.tray = new Tray(pathToIcon);
    this.tray.setToolTip(appName);
    this.tray.setContextMenu(contextMenu);

    this.tray.on('click', () => {
      this.window.show();
    });
  }
}
