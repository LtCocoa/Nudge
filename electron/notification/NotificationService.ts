import { type BrowserWindow } from "electron";

export class NotificationService {
  constructor (
    private readonly window: BrowserWindow,
  ) {}

  toggleFlash(flag: boolean) {
    this.window.flashFrame(flag);
  }
}
