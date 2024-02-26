import { Bot, session } from 'grammy'
import { BotContext } from 'src/bot'
import { initial } from 'src/lib/session'

export const initSession = (bot: Bot<BotContext>) => {
    bot.use(session({ initial }))
}
