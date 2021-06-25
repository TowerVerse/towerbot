// License: GPL-3.0
// Maintainer(s): TheOtterlord, KittyBorgX

import { MessageEmbed } from "discord.js";
import { Client } from "towerverse.js";
import { cooldown } from "../../middleware/cooldown";
import { Command } from "../../structures/Command";

const command = new Command({
  name: "online",
  desc: "Shows number of online travellers",
});

const client = new Client();

command.use(cooldown(10000));
command.setExecutor(async (app, msg) => {
  await client.connect();

  const num = await client.onlineTravellers();

  msg.channel.send(
    new MessageEmbed()
      .setTitle("Number of online Travellers")
      .setDescription(`There are ${num} travellers online.`)
  );
});

export default command;
