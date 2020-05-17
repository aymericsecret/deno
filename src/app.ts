import { ApplicationProcess } from "./ApplicationProcess.ts";
import { ServiceProvider } from "./services/providers/ServiceProvider.ts";
import defineApi from "./api/index.ts";

const applicationServiceProvider = new ServiceProvider();
const applicationProcess = new ApplicationProcess(
  applicationServiceProvider,
  defineApi
);
await applicationProcess.start();
