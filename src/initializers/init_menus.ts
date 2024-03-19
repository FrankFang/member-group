import { addressExpiredMenu } from '@/menus/address_expired/address_expired'
import { Bot } from 'grammy'
import { BotContext } from 'src/bot'
import { planMenu } from 'src/menus/plan/plan_menu'

export const initMenus = (bot: Bot<BotContext>) => {
    bot.use(planMenu)
    bot.use(addressExpiredMenu)
}
