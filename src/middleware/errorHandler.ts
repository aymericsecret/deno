import { ServiceProvider } from "../services/providers/ServiceProvider.ts";

export default (ServiceProvider: ServiceProvider) => {
  return async ({ response }: { response: any }, nextFn: () => {}) => {
    try {
      await nextFn();
    } catch (err) {
      ServiceProvider.logger.error("[ErrorHandler] An error has occured", {
        err,
      });
      response.status = 500;
      response.body = {
        status_code: 500,
        msg: err.message,
      };
    }
  };
};
