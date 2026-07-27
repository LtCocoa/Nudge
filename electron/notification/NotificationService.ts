import { type BrowserWindow } from "electron";
import { AppError } from "../error";

class NotificationService {
  private window: BrowserWindow | null = null;

  setWindow(window: BrowserWindow) {
    this.window = window;
  }

  toggleFlash(flag: boolean) {
    if (!this.window) {
      // throw new AppError('')
      return;
    }
    this.window.flashFrame(flag);
  }
}

export const notificationService = new NotificationService();
