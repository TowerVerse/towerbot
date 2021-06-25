// License: GPL-3.0
// Maintainer(s): TheOtterlord, KittyBorgX

import { Message } from "discord.js";
import { App } from "../../app";
import { Command } from "../../structures/Command";
import { MessageEmbed } from "discord.js";

const command = new Command({
  name: "ping",
  desc: "Ping the bot",
});

command.setExecutor(async (app: App, message: Message) => {
  const embed = new MessageEmbed()
    .setTitle("Pong!")
    .setDescription(`⏲️ Ping: ${Math.round(message.client.ws.ping)} ms`)
    .setColor("#fb644c");
  message.channel.send(embed);
});

export default command;
