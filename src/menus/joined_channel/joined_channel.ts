import { BotContext } from 'src/bot'

export const getJoinedChannelText = (ctx: BotContext) => {
    return `
✅ You have successfully joined Lookonchain Pro channel!

Your subscription will expire on *Feb 30 at 4:36 pm*.
    `.trim()
}
