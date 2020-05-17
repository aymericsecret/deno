import { ServiceProvider } from "../../ServiceProvider.ts";

export default function sayHello(serviceProvider: ServiceProvider) {
  return ({ response }: { response: any }) => {
    const { logger } = serviceProvider;
    logger.info("[/hello] Hit");
    response.status = 200;
    response.body = "Hello World !";
    logger.warning("Hit");
  };
}
