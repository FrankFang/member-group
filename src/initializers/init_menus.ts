import { Bot } from 'grammy'
import { BotContext } from 'src/lib/session'
import { planMenu } from 'src/menus/plan/plan_menu'

export const useMenus = (bot: Bot<BotContext>) => {
    bot.use(planMenu)
}
