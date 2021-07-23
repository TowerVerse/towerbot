// License: GPL-3.0
// Maintainer(s): TheOtterlord, KittyBorgX

import { MessageEmbed } from "discord.js";
import { cooldown } from "../../middleware/cooldown";
import { Command } from "../../structures/Command";

const command = new Command({
  name: "guilds",
  desc: "Shows total number of guilds"
});

command.use(cooldown(10000));
command.setExecutor(async (app, msg, args) => {
  (await app.connect()).client
    .listGuilds()
    .then((data) => {
      const Embed = new MessageEmbed()
        .setTitle("Total number of guilds!")
        .setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL())
        .setDescription(`Found ${data.length} guild${data.length === 1 ? '' : 's'}`)
        .setColor("#fb644c");

      msg.channel.send(Embed);
    })
    .catch((err) => {
      console.log(err);
      app.reportError(err, msg.content)
    });
});

export default command;
