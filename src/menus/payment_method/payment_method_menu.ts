import { Menu } from '@grammyjs/menu'
import dayjs from 'dayjs'
import type { BotContext } from 'src/bot'
import {
    addressExpire,
    afterSendingAddress,
    amountInsufficient,
    autoDeleteAddress,
    getSelectedPlan,
    showJoinedChannel,
    showPaymentCompleted,
    showSubscriptionExpired,
    showSubscriptionWillExpired,
} from 'src/lib/menu_helper'
import { addressExpiredMenu, getAddressExpiredText } from 'src/menus/address_expired/address_expired'
import { getPaymentAddressText } from 'src/menus/payment_address/payment_address'

const map: Record<number, [string, () => string]> = {
    1: ['Monthly', () => dayjs().add(1, 'month').format('MMM D')],
    2: ['Quarterly', () => dayjs().add(3, 'month').format('MMM D')],
    3: ['Yearly', () => dayjs().add(1, 'year').format('MMM D')],
}
export const getPaymentMenuText = (ctx: BotContext) => {
    const { orderType, orderTypes } = ctx.session
    const plan = orderTypes?.find((o) => o.type === orderType)
    if (!plan) throw new Error('Plan is not selected')
    return `
Your Subscription Plan:
*${plan.name}*
Expire Date:
*${map[orderType ?? 1][1]()}*
Please select a payment token:
`
}
export const paymentMethodMenu = new Menu<BotContext>('paymentMethodMenu').dynamic((ctx, range) => {
    const selected = getSelectedPlan(ctx)
    if (!selected) throw new Error('Plan is not selected')
    selected.tokens.forEach((token) => {
        range.text(token.name, onChooseToken(token.name)).row()
    })
})
paymentMethodMenu.register(addressExpiredMenu)

function onChooseToken(token: string) {
    return async (ctx: BotContext) => {
        ctx.session.tokenName = token
        const selectedPlan = getSelectedPlan(ctx)
        const selectedToken = selectedPlan?.tokens.find((t) => t.token === token)
        ctx.session.tokenAddress = selectedToken?.token
        const text = await getPaymentAddressText(ctx)
        const message = await ctx.replyWithMarkdownV1(text)
        afterSendingAddress(ctx, message)
    }
}
