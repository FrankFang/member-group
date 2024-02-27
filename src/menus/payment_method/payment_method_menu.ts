import { Menu } from '@grammyjs/menu'
import dayjs from 'dayjs'
import type { BotContext } from 'src/bot'
import {
    addressExpire,
    afterSendingAddress,
    amountInsufficient,
    autoDeleteAddress,
    showJoinedChannel,
    showPaymentCompleted,
    showSubscriptionExpired,
    showSubscriptionWillExpired,
} from 'src/lib/menu_helper'
import { addressExpiredMenu, getAddressExpiredText } from 'src/menus/address_expired/address_expired'
import { getPaymentAddressText } from 'src/menus/payment_address/payment_address'

const map = {
    monthly: ['Monthly: $49', () => dayjs().add(1, 'month').format('MMM DD')],
    quarterly: ['Quarterly: $98 (30% off)', () => dayjs().add(3, 'month').format('MMM DD')],
    yearly: ['Yearly: $298 (50% off)', () => dayjs().add(1, 'year').format('MMM DD')],
} as const
export const getPaymentMenuText = (ctx: BotContext) => {
    const { plan } = ctx.session
    if (!plan) throw new Error('Plan is not selected')
    return `
Your Subscription Plan:
*${map[plan][0]}*
Expire Date:
*${map[plan][1]()}*
Please select a payment token:
`
}
export const paymentMethodMenu = new Menu<BotContext>('paymentMethodMenu')
    .text('USDT(ERC20)', onChooseToken('USDT'))
    .row()
    .text('USDC(ERC20)', onChooseToken('USDC'))
paymentMethodMenu.register(addressExpiredMenu)

function onChooseToken(token: 'USDT' | 'USDC') {
    return async (ctx: BotContext) => {
        ctx.session.token = token
        ctx.session.tokenAddress = '0x957b62757bcfdc88fe6fb97caf8c3b6abddb0019'
        const message = await ctx.replyWithMarkdownV1(getPaymentAddressText(ctx))
        afterSendingAddress(ctx, message)
    }
}
