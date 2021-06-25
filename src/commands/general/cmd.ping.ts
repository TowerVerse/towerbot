// License: GPL-3
// Maintainer: Otterlord#3653, KittyBorgX#1415
// Contributors:
//
// File description:
//     The file for the !ping command of the TowerBot
//
// Extra info:
//     Displays the latency between you and the Discord API
//

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
