import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import { ServiceProvider } from "./services/providers/ServiceProvider.ts";
import notFoundHandler from "./middleware/notFoundHandler.ts";
import errorHandler from "./middleware/errorHandler.ts";

export type defineApiFn<T extends ServiceProvider> = (
  serviceProvider: T
) => Router;

export class ApplicationProcess<W extends ServiceProvider> {
  private _app: Application;
  private _isRunning: boolean = false;
  private _serviceProvider: ServiceProvider;

  constructor(serviceProvider: ServiceProvider, definedApi: defineApiFn<W>) {
    this._app = new Application();
    this._serviceProvider = serviceProvider;

    this.oakSetup(definedApi);
  }

  public get logger(): any {
    return this._serviceProvider.logger;
  }

  public get app(): Application {
    return this._app;
  }

  public async start(): Promise<boolean> {
    if (this._isRunning) {
      this.logger.info("[Application] Server already running");
      return false;
    }

    await this._serviceProvider.startServices();

    this.app.listen({ port: 8080 });
    this.logger.info("[Application] ✔ Server running in port 8080");

    this._isRunning = true;
    return true;
  }

  public async stop(): Promise<boolean> {
    if (!this._isRunning) {
      return false;
    }

    // TODO: Shut down

    this.logger.info("Application stopped");

    this._isRunning = false;
    return true;
  }

  private oakSetup(defineApi: defineApiFn<W>): Application {
    const router = defineApi(this._serviceProvider as W);

    router.get("/heartbeat", ({ response }: { response: any }) => {
      this.logger.info("[/heartbeat] Hit");
      response.status = 200;
      response.body = "up";
    });

    this.app.use(errorHandler(this._serviceProvider));
    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
    this.app.use(notFoundHandler);

    this.app.use((ctx) => {
      // TODO: Error handler
      // Will throw a 500 on every request.
      this.logger.error("[Application] Error", ctx);
      ctx.throw(500);
    });
    return this.app;
  }
}
