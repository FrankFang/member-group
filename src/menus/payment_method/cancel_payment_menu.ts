import { replaceMenu } from '@/lib/menu_helper'
import { getPaymentAddressText } from '@/menus/payment_address/payment_address'
import { Menu } from '@grammyjs/menu'
import { BotContext } from 'src/bot'
export const cancelPaymentMenu = new Menu<BotContext>('addressExpiredMenu').text(
    (ctx) => (ctx.session.walletToCancel ? 'Confirm' : 'Cancel Payment'),
    onCancelPayment
)

async function onCancelPayment(ctx: BotContext) {
    if (ctx.session.walletToCancel) {
        await ctx.api.deleteMessage(ctx.chat?.id ?? 0, ctx.msg?.message_id ?? 0)
    } else {
        ctx.session.walletToCancel = ctx.session.order?.wallet
        ctx.api.editMessageReplyMarkup(ctx.chat?.id ?? 0, ctx.msg?.message_id ?? 0, { reply_markup: cancelPaymentMenu })
    }
}
