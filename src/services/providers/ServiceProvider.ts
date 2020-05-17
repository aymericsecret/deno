import LoggerUtil from "../../utils/LoggerUtil.ts";
import { Logger } from "https://deno.land/std/log/logger.ts";

export interface ServiceContainer {
  logger: LoggerUtil;
  // All other services injected from children classes
  [key: string]: object;
}

export class ServiceProvider {
  protected _serviceContainer: ServiceContainer;

  constructor() {
    this._serviceContainer = {
      logger: new LoggerUtil(),
    };
  }

  public get serviceContainer() {
    return this._serviceContainer;
  }

  public get logger(): Logger {
    const logger = this._serviceContainer.logger.getLogger();
    if (logger === null) {
      throw new Error("[ServiceProvider] Logger not initialized");
    }
    return logger;
  }

  public async startServices() {
    await this._serviceContainer.logger.initLogger();
    this.logger.info("[ServiceProvider] Started");
  }
}
