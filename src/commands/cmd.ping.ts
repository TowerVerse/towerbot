import { Message } from "discord.js";
import { App } from "../app";
import { Command } from "../structures/Command";

const command = new Command({
  name: 'ping',
  desc: 'Ping the bot'
})

command.setExecutor((app: App, msg: Message) => {
  msg.reply('Pong!')
})

export default command
