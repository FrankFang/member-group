import { BotContext } from '@/bot'
import { Bot } from 'grammy'
import { generateUpdateMiddleware } from 'telegraf-middleware-console-time'
export const initLog = (bot: Bot<BotContext>) => {
    if (process.env.NODE_ENV !== 'production') {
        bot.use(generateUpdateMiddleware())
    }
}
