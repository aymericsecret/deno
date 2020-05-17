import { ServiceProvider } from "../../services/providers/ServiceProvider.ts";

export default function sayHello(serviceProvider: ServiceProvider) {
  return async ({ request, response }: { request: any; response: any }) => {
    const { logger } = serviceProvider;
    logger.info("[/hello] Hit");
    let name: string;
    if (!request.hasBody) {
      name = "John Doe";
    } else {
      ({
        value: { name },
      } = await request.body());
    }

    response.status = 200;
    response.body = `Hello  ${name}!`;
  };
}
