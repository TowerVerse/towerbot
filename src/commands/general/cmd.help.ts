// License: GPL-3.0
// Maintainer(s): TheOtterlord, KittyBorgX

import { Message, MessageEmbed } from "discord.js";
import { App } from "../../app";
import { Command } from "../../structures/Command";

const command = new Command({
  name: "help",
  desc: "Display Help Window",
  args: [{ name: "cmd", required: false }],
});

command.setExecutor((app: App, msg: Message, args) => {
  if (args[0]) {
    const command = app.commands.cache.get(args[0]);
    if (!command) return msg.reply("Command does not exist");
    const embed = new MessageEmbed()
      .setTitle(`${app.commands.prefix}${command.name} ${command.args.map(arg => `\`${arg.name}${arg.required ? ': required' : ''}\``).join(', ')}`)
      .setDescription(command.desciption)
      .setColor(0xffffff);
    return msg.channel.send(embed);
  }

  const embed = new MessageEmbed()
    .setTitle("Towerbot Help")
    .setDescription("Info on commands")
    .setURL("https://github.com/TowerVerse/towerbot")
    .setColor(0xffffff);

  app.commands.cache.map((command) => {
    embed.addField(
      `${app.commands.prefix}${command.name} ${command.args.map(arg => `\`${arg.name}${arg.required ? ': required' : ''}\``).join(', ')}`,
      command.desciption,
      true
    );
  });

  msg.channel.send(embed);
});

export default command;
