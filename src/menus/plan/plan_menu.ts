import { Menu } from '@grammyjs/menu'
import { replaceMenu } from 'src/lib/menu_helper'
import { BotContext } from 'src/lib/session'
import { getPaymentMenuText, paymentMethodMenu } from 'src/menus/payment_method/payment_method_menu'

export const getPlanMenuText = () =>
    `
Welcome to Lookonchain Pro Channel!

What You Can Get in This Channel:

a. Receive tweet content 1-2 minutes faster than Twitter.

b. Alphas sharing only in the paid channel.

c. No chatting in the channel.

d. Try our beta tool for free when it goes live.

e. More alerts from SmartMoney.

f. We will interpret transactions for you when you comment.

For any assistance, please reach out to the admin @lookonchainsupport.

Please select your subscription plan:
`.trim()

export const planMenu = new Menu<BotContext>('planMenu')
    .text('Monthly: $49', onChoosePlan('monthly'))
    .row()
    .text('Quarterly: $98 (30% off)', onChoosePlan('quarterly'))
    .row()
    .text('Yearly: $298 (50% off)', (ctx) => onChoosePlan('yearly')(ctx))
planMenu.register(paymentMethodMenu)

function onChoosePlan(plan: 'monthly' | 'quarterly' | 'yearly') {
    return async (ctx: BotContext) => {
        console.log('session', ctx.session)
        ctx.session.plan = plan
        await replaceMenu(ctx, getPaymentMenuText(ctx), paymentMethodMenu)
    }
}
