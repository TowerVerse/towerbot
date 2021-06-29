// License: GPL-3.0
// Maintainer(s): TheOtterlord, KittyBorgX

import { MiddlewareMethod } from "../structures/Command";

export const cooldown = (timeout: number) => {
  const cooldowns = new Set();

  const mid: MiddlewareMethod = (app, msg, args, next) => {
    if (msg.member?.hasPermission('ADMINISTRATOR')) return next()

    if (cooldowns.has(msg.member?.user.id))
      return msg.reply(
        `You must wait before activating this command. Cooldown is ${(
          timeout / 1000
        ).toFixed(0)} second(s)`
      );

    cooldowns.add(msg.member?.user.id);
    setTimeout(() => {
      cooldowns.delete(msg.member?.user.id);
    }, timeout);

    next();
  };
  return mid;
};
