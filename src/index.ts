// License: GPL-3.0
// Maintainer(s): TheOtterlord, KittyBorgX

import { App } from "./app";
import * as dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN ?? "";
const app = new App(token);

app.start();

const events = ["SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM", "uncaughtException"];

events.forEach((event) => {
  process.on(event, (err) => app.stop(event, err));
});
