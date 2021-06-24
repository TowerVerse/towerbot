# Towerbot

The Discord bot for the TowerVerse Discord server.

## Usage

Clone the repository and navigate to the folder.

Create a `.env` file and add a value `BOT_TOKEN` set to your bot token.

To run this bot for development, use.

```bash
npm run dev
```

To run this bot for production, use.

```bash
npm ci
npm run build
npm run start
```

## Adding Commands

Create a `cmd.*.ts` file inside the `src/commands` folder, replacing `*` with your command name.
Use the template below to create your command.

```ts
import { Message } from "discord.js";
import { App } from "../app";
import { Command } from "../structures/Command";

const command = new Command({
  name: '*',
  desc: 'Description of my command'
})

command.setExecutor((app: App, msg: Message) => {
  // Add your command here
})

export default command
```

### Using arguments in your commands

Your command can accept arguments using the optional `args` value when constructing a command.
You can used the `required` parameter to require that an argument is present.

```ts
const command = new Command({
  name: 'ping',
  desc: 'Replies with your message',
  args: [
    { name: 'message', required: true }
  ]
})
```
