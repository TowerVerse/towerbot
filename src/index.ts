import { App } from './app'
import * as dotenv from 'dotenv';

dotenv.config();

const token = process.env.BOT_TOKEN ?? "";
const app = new App(token);

app.start();

const events = ["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM"]

events.forEach(event => {
  process.on(event, (e) => app.stop(e))
})
