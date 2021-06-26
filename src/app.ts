// License: GPL-3.0
// Maintainer(s): TheOtterlord, KittyBorgX

import { Client, MessageEmbed } from "discord.js";
import { Commands } from "./classes/commands";
import { Client as TowerVerseClient } from "towerverse.js"

export class App {
  bot: Client = new Client();
  commands: Commands = new Commands(this, "!");
  client: TowerVerseClient = new TowerVerseClient()

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

      this.client.connect().then(() => {
        this.client.loginTraveller(process.env.TRAVELLER_EMAIL!, process.env.TRAVELLER_PASSWORD!).then(() => {
          console.log(
            "Successfully logged into towerverse as",
            this.client.traveller?.name
          )
        })
      }).catch(err => {
        console.error(
          "Failed to login to towerverse with error:",
          err.message
        )
        process.exit()
      })

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
  async stop(event: string, error) {
    if (process.env.MAINTAINER && event === 'uncaughtException') {
      const user = await this.bot.users.fetch(process.env.MAINTAINER!);
      await (await user.createDM()).send(
        new MessageEmbed()
        .setTitle('Bot Crashed!')
        .setColor('#ff0000')
        .setDescription(`The bot has crashed with an error: ${error}`)
      )
    }
    this.bot.destroy();
    console.error(`Stopped bot with event '${event}'`);
    console.log(error)
    process.exit()
  }
}
