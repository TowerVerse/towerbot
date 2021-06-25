// License: GPL-3.0
// Maintainer(s): TheOtterlord, KittyBorgX

import { Message, MessageEmbed } from "discord.js";
import { Client } from "towerverse.js";
import { cooldown } from "../../middleware/cooldown";
import { Command } from "../../structures/Command";

const command = new Command({
  name: "travellers",
  desc: "Shows total number of travellers",
  args: [{ name: "server", required: false }],
});

const client = new Client();

command.use(cooldown(10000));
command.setExecutor(async (app, msg, args) => {
  client.connect("wss://towerverse.herokuapp.com").then(async () => {
    console.log("Connected to server");
    client
      .totalTravellers()
      .then((data) => {
        const Embed = new MessageEmbed()
          .setTitle("Number of online travellers!")
          .setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL())
          .setDescription(`Found ${data} traveller(s)`)
          .setColor("#fb644c");

        msg.channel.send(Embed);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

export default command;
