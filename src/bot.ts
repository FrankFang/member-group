import { initLog } from '@/initializers/init_log'
import { initSse } from '@/initializers/init_sse'
import { ParseModeFlavor } from '@grammyjs/parse-mode'
import { Bot, Context, SessionFlavor } from 'grammy'
import { SocksProxyAgent } from 'socks-proxy-agent'
import { initMenus } from 'src/initializers/init_menus'
import { initParseMode } from 'src/initializers/init_parse_mode'
import { initSession } from 'src/initializers/init_session'
import type { SessionData } from 'src/lib/session'
import { getPlanMenuText, planMenu } from 'src/menus/plan/plan_menu'

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
initSse(bot)
bot.command('start', async (ctx) => {
    ctx.session.chatId = ctx.chat?.id
    const text = await getPlanMenuText(ctx)
    await ctx.reply(text, { reply_markup: planMenu })
})

bot.catch((error) => {
    console.log(error)
})
