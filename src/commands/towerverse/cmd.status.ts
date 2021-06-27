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

function ping(client: Client) {
  return new Promise(async (res, rej) => {
    const logout = !!client.traveller
    if (!client.traveller) await client.loginTraveller(process.env.TRAVELLER_EMAIL!, process.env.TRAVELLER_PASSWORD!)
    const t1 = performance.now();
    await client.onlineTravellers();
    const t2 = performance.now();
    if (logout) await client.traveller?.logout()
    res(t2 - t1);
  });
}

command.use(cooldown(10000));
command.setExecutor(async (app, msg, args) => {
  const pings: any[] = [];

  try {
    if (args[0] !== "beta") pings.push(["stable", await ping(app.client)]);
    if (args[0] !== "stable")
      pings.push(["beta", await ping(await (await new Client().connect("wss://towerverse-beta.herokuapp.com")).loginTraveller(process.env.TRAVELLER_EMAIL!, process.env.TRAVELLER_PASSWORD!))]);
  } catch (err) {
    app.reportError(`${err}`, msg.content)
    return msg.reply('Failed to connect to towerverse')
  }

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
