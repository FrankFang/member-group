import { apiGetPlans } from '@/api/api'
import { Menu, MenuRange } from '@grammyjs/menu'
import { BotContext } from 'src/bot'
import { replaceMenu } from 'src/lib/menu_helper'
import { getPaymentMenuText, paymentMethodMenu } from 'src/menus/payment_method/payment_method_menu'

export const getPlanMenuText = () => {
    return `
Welcome to Lookonchain Pro Channel!🎉

What You Can Get in This Channel:

a. Receive tweet content 1-2 minutes faster than Twitter.

b. Alphas sharing only in the paid channel.

c. No chatting in the channel.

d. Try our beta tool for free when it goes live.

e. More alerts

- Transfers of SmartMoney and Famous Wallets
- Large transfers from/to CEX

f. We will interpret transactions for you when you comment.

Please select your subscription plan:
`.trim()
}

export const planMenu = new Menu<BotContext>('planMenu').dynamic(async (ctx, range) => {
    const orderTypes = (await apiGetPlans()).order_types
    orderTypes.forEach((orderType) => {
        range.text(orderType.name, onChoosePlan(orderType.type)).row()
    })
})
planMenu.register(paymentMethodMenu)

function onChoosePlan(type: number) {
    return async (ctx: BotContext) => {
        ctx.session.orderType = type
        ctx.session.walletToCancel = undefined
        await replaceMenu(ctx, getPaymentMenuText(ctx), paymentMethodMenu)
    }
}
