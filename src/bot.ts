import { Bot } from 'grammy'
import { SocksProxyAgent } from 'socks-proxy-agent'
import { useMenus } from 'src/initializers/init_menus'
import { useSession } from 'src/initializers/init_session'
import { BotContext } from 'src/lib/session'
import { getPlanMenuText, planMenu } from 'src/menus/plan/plan_menu'

export const bot = new Bot<BotContext>(process.env.BOT_TOKEN || '', {
    client:
        process.env.NODE_ENV === 'production'
            ? {}
            : {
                  baseFetchConfig: {
                      agent: new SocksProxyAgent(`socks://localhost:${process.env.PROXY_PORT}`),
                      compress: true,
                  },
              },
})

useMenus(bot)
useSession(bot)

bot.command('start', async (ctx) => {
    await ctx.reply(getPlanMenuText(), { reply_markup: planMenu })
})
