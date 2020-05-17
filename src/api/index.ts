import { Router } from "https://deno.land/x/oak/mod.ts";
import sayHello from "./hello/index.ts";
import { ServiceProvider } from "../ServiceProvider.ts";

export default function setupRoutes(serviceProvider: ServiceProvider): Router {
  const router = new Router();

  router.get("/api/hello", sayHello(serviceProvider));

  return router;
}
