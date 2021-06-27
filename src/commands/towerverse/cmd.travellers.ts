// License: GPL-3.0
// Maintainer(s): TheOtterlord, KittyBorgX

import { MessageEmbed } from "discord.js";
import { cooldown } from "../../middleware/cooldown";
import { Command } from "../../structures/Command";

const command = new Command({
  name: "travellers",
  desc: "Shows total number of travellers"
});

command.use(cooldown(10000));
command.setExecutor(async (app, msg, args) => {
  (await app.connect()).client
    .totalTravellers()
    .then((data) => {
      const Embed = new MessageEmbed()
        .setTitle("Total number of travellers!")
        .setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL())
        .setDescription(`Found ${data} traveller(s)`)
        .setColor("#fb644c");

      msg.channel.send(Embed);
    })
    .catch((err) => {
      console.log(err);
      app.reportError(err, msg.content)
    });
});

export default command;
