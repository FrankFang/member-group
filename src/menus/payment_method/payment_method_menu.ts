import { Menu } from '@grammyjs/menu'
import { BotContext } from 'src/lib/session'
import dayjs from 'dayjs'

const map = {
    monthly: ['Monthly: $49', () => dayjs().add(1, 'month').format('MMM DD')],
    quarterly: ['Quarterly: $98 (30% off)', () => dayjs().add(3, 'month').format('MMM DD')],
    yearly: ['Yearly: $298 (50% off)', () => dayjs().add(1, 'year').format('MMM DD')],
} as const
export const getPaymentMenuText = (ctx: BotContext) => {
    const { plan } = ctx.session
    return `
Your Subscription Plan:
${map[plan][0]}
Expire Date:
${map[plan][1]()}
Please select a payment token:
`
}

export const paymentMethodMenu = new Menu('paymentMethodMenu')
    .text('USDT(ERC20)', () => {})
    .row()
    .text('USDC(ERC20)', () => {})
