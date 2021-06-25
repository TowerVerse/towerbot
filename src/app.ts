// License: GPL-3.0
// Maintainer(s): TheOtterlord, KittyBorgX

import { Client } from "discord.js";
import { Commands } from "./classes/commands";

export class App {
  bot: Client = new Client();
  commands: Commands = new Commands(this, "!");

  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  /**
   * Start the bot
   */
  start(): Promise<App> {
    return new Promise((res, rej) => {
      this.bot
        .login(this.token)
        .then(() => {
          res(this);
          this.commands.register(`${__dirname}/commands`);
          console.log(
            "Successfully logged into discord as",
            this.bot.user?.tag
          );
        })
        .catch((err) => {
          res(err.message);
        });

      this.bot.on("ready", () => {
        this.bot.user?.setActivity({
          name: "TowerVerse",
          type: "PLAYING",
        });
      });
    });
  }

  /**
   * Stop the bot
   */
  stop(event: string) {
    this.bot.destroy();
    console.error(`Stopped bot with event '${event}'`);
  }
}
