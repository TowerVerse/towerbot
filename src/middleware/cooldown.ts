import { MiddlewareMethod } from "../structures/Command"

export const cooldown = (timeout: number) => {
  const cooldowns = new Set()

  const mid: MiddlewareMethod = (app, msg, args, next) => {
    if (cooldowns.has(msg.member?.user.id)) return msg.reply(`You must wait before activating this command. Cooldown is ${(timeout / 1000).toFixed(0)} second(s)`,)

    cooldowns.add(msg.member?.user.id)
    setTimeout(() => {
      cooldowns.delete(msg.member?.user.id)
    }, timeout)

    next()
  }
  return mid;
}
