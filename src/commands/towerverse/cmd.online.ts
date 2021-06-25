// License: GPL-3
// Maintainer: Shadofer#0001
// Contributors: Otterlord#3653, KittyBorgX#1415
//
// File description:
//     The file for the !online command of the TowerBot
//
// Extra info:
//     This file is using the towerverse.js npm package.
//     Makes request to wss://towerverse-beta.herokuapp.com'
//

import { Message, MessageEmbed } from "discord.js";
import { Client } from "towerverse.js";
import { cooldown } from "../../middleware/cooldown";
import { Command } from "../../structures/Command";
import { performance } from "perf_hooks";

const command = new Command({
  name: "online",
  desc: "Shows number of online travellers",
  args: [{ name: "server", required: false }],
});

const client = new Client();

command.use(cooldown(10000));
command.setExecutor(async (app, msg, args) => {
  const pings: any[] = [];

  await client.connect();

  const num = await client.onlineTravellers();

  msg.channel.send(
    new MessageEmbed()
      .setTitle("Number of online Travellers")
      .setDescription(`There are ${num} travellers online.`)
  );
});

export default command;
