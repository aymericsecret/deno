import * as log from "https://deno.land/std/log/mod.ts";
import { Logger } from "https://deno.land/std/log/logger.ts";

export default class LoggerUtil {
  private logger: Logger | null = null;

  constructor() {}

  public async initLogger() {
    if (this.logger === null) {
      await log.setup({
        handlers: {
          console: new log.handlers.ConsoleHandler("DEBUG", {
            formatter: "[{levelName}] {msg}",
          }),
          file: new log.handlers.FileHandler("WARNING", {
            filename: "./log.txt",
            // you can change format of output message using any keys in `LogRecord`
            formatter: "[{levelName}] {msg}",
          }),
        },
        loggers: {
          // configure default logger available via short-hand methods above
          default: {
            level: "DEBUG",
            handlers: ["console", "file"],
          },
        },
      });
      this.logger = log.getLogger();
    }
  }

  public getLogger(): Logger | null {
    return this.logger;
  }
}
