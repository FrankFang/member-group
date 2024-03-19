import { Menu } from '@grammyjs/menu'
import { BotContext } from 'src/bot'
import { getPaymentAddressText } from 'src/menus/payment_address/payment_address'

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

export async function onResendAddress(ctx: BotContext) {
    const text = await getPaymentAddressText(ctx)
    const message = await ctx.replyWithMarkdownV1(text)
}
