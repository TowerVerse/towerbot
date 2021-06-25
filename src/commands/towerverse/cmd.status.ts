// License: GPL-3.0
// Maintainer(s): TheOtterlord, KittyBorgX

import { MessageEmbed } from "discord.js";
import { Client } from "towerverse.js";
import { cooldown } from "../../middleware/cooldown";
import { Command } from "../../structures/Command";
import { performance } from "perf_hooks";

const command = new Command({
  name: "status",
  desc: "Query the status of the server",
  args: [{ name: "server", required: false }],
});

function ping(url?: string) {
  return new Promise((res, rej) => {
    new Client()
      .connect(url)
      .then(async (client) => {
        const t1 = performance.now();
        await client.onlineTravellers();
        const t2 = performance.now();
        client.disconnect();
        res(t2 - t1);
      })
      .catch(() => {
        res("Cannot connect to server");
      });
  });
}

command.use(cooldown(10000));
command.setExecutor(async (app, msg, args) => {
  const pings: any[] = [];

  if (args[0] !== "beta") pings.push(["stable", await ping()]);
  if (args[0] !== "stable")
    pings.push(["beta", await ping("wss://towerverse-beta.herokuapp.com")]);

  msg.channel.send(
    new MessageEmbed().setTitle("TowerVerse Status").addFields(
      pings.map((val) => {
        return {
          name: val[0],
          value: `${val[1].toFixed()} ${
            typeof val[1] === "number" ? "ms" : ""
          }`,
        };
      })
    )
  );
});

export default command;
