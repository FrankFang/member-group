import { Menu } from '@grammyjs/menu'

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

export const planMenu = new Menu('planMenu')
    .text('Monthly: $49', (ctx) => ctx.reply('You pressed A!'))
    .row()
    .text('Quarterly: $98 (30% off)', (ctx) => ctx.reply('You pressed B!'))
    .row()
    .text('Yearly: $298 (50% off)', (ctx) => ctx.reply('You pressed C!'))
