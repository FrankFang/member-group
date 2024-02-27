import { Menu } from '@grammyjs/menu'
import { on } from 'events'
import { BotContext } from 'src/bot'
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
import { getPaymentAddressText } from 'src/menus/payment_address/payment_address'
import { paymentMethodMenu } from 'src/menus/payment_method/payment_method_menu'

export const getAddressExpiredText = (ctx: BotContext) => {
    return `
❗️Your subscription plan billing address has expired.

For any assistance, please reach out to the admin @lookonchainsupport.
    `.trim()
}

export const addressExpiredMenu = new Menu<BotContext>('addressExpiredMenu').text(
    'Resend billing address',
    onResendAddress
)

async function onResendAddress(ctx: BotContext) {
    const message = await ctx.replyWithMarkdownV1(getPaymentAddressText(ctx))
    afterSendingAddress(ctx, message)
}
