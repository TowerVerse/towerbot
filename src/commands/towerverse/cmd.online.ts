// License: GPL-3.0
// Maintainer(s): TheOtterlord, KittyBorgX

import { MessageEmbed } from "discord.js";
import { cooldown } from "../../middleware/cooldown";
import { Command } from "../../structures/Command";

const command = new Command({
  name: "online",
  desc: "Shows number of online travellers",
});

command.use(cooldown(10000));
command.setExecutor(async (app, msg) => {
  const num = await app.client.onlineTravellers();

  msg.channel.send(
    new MessageEmbed()
      .setTitle("Number of online Travellers")
      .setDescription(`There are ${num} travellers online.`)
  );
});

export default command;
