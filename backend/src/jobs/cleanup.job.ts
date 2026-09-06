import cron from "node-cron";
import { deleteExpiresUrls } from "../urls/urls.service";

cron.schedule(
  "0 0 * * *",
  async () => {
    await deleteExpiresUrls();
  },
  {
    timezone: "America/Sao_Paulo",
  },
);
