import { initLog } from '@/initializers/init_log'
import { ParseModeFlavor } from '@grammyjs/parse-mode'
import { Bot, Context, SessionFlavor } from 'grammy'
import { SocksProxyAgent } from 'socks-proxy-agent'
import { initMenus } from 'src/initializers/init_menus'
import { initParseMode } from 'src/initializers/init_parse_mode'
import { initSession } from 'src/initializers/init_session'
import type { SessionData } from 'src/lib/session'
import { getPlanMenuText, planMenu } from 'src/menus/plan/plan_menu'
import { initPolling } from './initializers/init_polling'
import { apiGetPlans } from '@/api/api'

export type BotContext = Context & SessionFlavor<SessionData> & ParseModeFlavor<Context>

export const bot = new Bot<BotContext>(process.env.BOT_TOKEN || '', {
    client: !process.env.PROXY_PORT
        ? {}
        : {
              baseFetchConfig: {
                  agent: new SocksProxyAgent(`socks://localhost:${process.env.PROXY_PORT}`),
                  compress: true,
              },
          },
})

// 不要随意改动 init 的顺序
initLog(bot)
initParseMode(bot)
initSession(bot)
initMenus(bot)
initPolling(bot)
bot.command('start', async (ctx) => {
    ctx.session.chatId = ctx.chat?.id
    ctx.session.orderTypes = (await apiGetPlans()).order_types
    const text = getPlanMenuText()
    await ctx.reply(text, { reply_markup: planMenu })
})

bot.catch((error) => {
    console.log(error)
})
