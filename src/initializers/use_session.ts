import { Bot, session } from 'grammy'
import { BotContext, initial } from 'src/lib/session'

export const useSession = (bot: Bot<BotContext>) => {
    bot.use(session({ initial }))
}
