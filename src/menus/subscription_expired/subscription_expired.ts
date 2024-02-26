import { BotContext } from 'src/bot'

export const getSubscriptionExpiredText = (ctx: BotContext) => {
    return `
Your subscription has expired and you have been removed from the channel.
If you would like to re-subscribe to our channel, please select your subscription plan:
`.trim()
}
