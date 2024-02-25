import { Bot, session } from 'grammy'
import { BotContext, initial } from 'src/lib/session'

export const initSession = (bot: Bot<BotContext>) => {
    bot.use(session({ initial }))
}
