// License: GPL-3.0
// Maintainer(s): TheOtterlord, KittyBorgX

import { Collection } from "discord.js";
import glob from "glob";
import { App } from "../app";
import { Command } from "../structures/Command";

export class Commands {
  app: App;
  cache: Collection<string, Command> = new Collection();
  prefix: string;

  constructor(app: App, prefix: string) {
    this.app = app;
    this.prefix = prefix;

    this.startListener(prefix);
  }

  register(dir: string): Promise<Commands> {
    return new Promise((res, rej) => {
      const ext = __filename.endsWith("ts") ? "ts" : "js";
      glob(`${dir}/**/cmd.*.${ext}`, async (err, files) => {
        files.map((f) => {
          const imported = require(f);
          const def = imported.default;
          if (!(imported.default instanceof Command)) return;

          const cmd: Command = imported.default;
          this.cache.set(cmd.name, cmd);
        });
      });
      res(this);
    });
  }

  private startListener(prefix: string) {
    this.app.bot.on("message", (msg) => {
      if (!msg.content.startsWith(prefix)) return;

      const command = msg.content.slice(prefix.length).trim().split(" ")[0];

      if (!this.cache.has(command)) return;

      console.log(`\x1b[33mExecuting '${msg}'\x1b[0m`)

      this.cache.get(command)?.execute(this.app, msg);
    });
  }
}
