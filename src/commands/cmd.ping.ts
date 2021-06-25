import { Message } from "discord.js";
import { App } from "../app";
import { Command } from "../structures/Command";
import { Client } from "discord.js" 
import { MessageEmbed } from "discord.js";

const client = new Client()

const command = new Command({
  name: 'ping',
  desc: 'Ping the bot'
})

command.setExecutor(async (app: App, message: Message) => {
  const msg = await message.channel.send("Pinging...");
  const Embed = new MessageEmbed()
    .setTitle("Pong!")
    .setAuthor(`${message.author.username}` , message.author.displayAvatarURL())
    .setDescription(
      `⌛ Latency is ${Math.floor(
        msg.createdTimestamp - message.createdTimestamp
      )}ms\n⏲️ API Ping is ${Math.round(message.client.ws.ping)}`
    )
    .setColor('#fb644c');
  msg.edit(Embed);

})

export default command
