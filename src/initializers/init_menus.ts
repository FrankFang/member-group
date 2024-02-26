import { Bot } from 'grammy'
import { BotContext } from 'src/bot'
import { paymentMethodMenu } from 'src/menus/payment_method/payment_method_menu'
import { planMenu } from 'src/menus/plan/plan_menu'

export const initMenus = (bot: Bot<BotContext>) => {
    bot.use(planMenu)
}
