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
import { onResendAddress } from '@/menus/address_expired/address_expired'
import { replaceMenu } from '@/lib/menu_helper'
import { getPaymentMenuText, paymentMethodMenu } from '@/menus/payment_method/payment_method_menu'

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
bot.callbackQuery('resend_address', async (ctx) => {
    return onResendAddress(ctx)
})
bot.on('callback_query:data', async (ctx) => {
    if (ctx.callbackQuery.data.startsWith('choose_plan_')) {
        const type = parseInt(ctx.callbackQuery.data.split('_')[2])
        ctx.session.orderType = type
        ctx.session.walletToCancel = undefined
        await replaceMenu(ctx, getPaymentMenuText(ctx), paymentMethodMenu)
    }
})

bot.catch((error) => {
    console.log(error)
})
