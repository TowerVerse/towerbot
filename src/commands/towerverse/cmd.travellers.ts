// License: GPL-3
// Maintainer: Shadofer#0001
// Contributors: Otterlord#3653, KittyBorgX#1415
//
// File description:
//     The file for the !online command of the TowerBot
//
// Extra info:
//     This file is using the towerverse.js npm package.
//     Makes request to wss://towerverse-beta.herokuapp.com'
//

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
  client.connect("wss://towerverse-beta.herokuapp.com").then(async () => {
    console.log("Connected to server");
    client
      .listTravellers()
      .then((data) => {
        const Embed = new MessageEmbed()
          .setTitle("Number of online travellers!")
          .setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL())
          .setDescription(`Found ${data.length} traveller`)
          .setColor("#fb644c");

        msg.channel.send(Embed);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

export default command;
