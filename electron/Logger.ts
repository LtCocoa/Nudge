import { appendFileSync } from "node:fs";
import { app } from "electron";
import path from "node:path";

class Logger {
  private logFilePath: string;

  constructor() {
    const logsPath = app.getPath('logs');
    this.logFilePath = path.resolve(logsPath, 'app.log');
  }

  private append(text: string) {
    const [date, time] = new Date().toLocaleString().split(', ');
    const entry = `[${date} ${time}] ${text}\n`;
    appendFileSync(this.logFilePath, entry);
  }

  log(text: string) {
    this.append(`INFO ${text}`);
  }

  error(text: string) {
    this.append(`ERROR ${text}`);
  }
}

export const logger = new Logger();