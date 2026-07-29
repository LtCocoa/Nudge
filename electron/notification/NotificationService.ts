import { type BrowserWindow } from "electron";

class NotificationService {
  private window: BrowserWindow | null = null;

  setWindow(window: BrowserWindow) {
    this.window = window;
  }

  toggleFlash(flag: boolean) {
    if (!this.window) {
      return;
    }
    this.window.flashFrame(flag);
  }
}

export const notificationService = new NotificationService();
