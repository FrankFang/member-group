import { InlineKeyboardMarkup } from 'grammy/types'
import { BotContext } from 'src/bot'
import { addressExpiredMenu, getAddressExpiredText } from 'src/menus/address_expired/address_expired'
import { getAmountInsufficientText } from 'src/menus/amount_insufficient/amount_insufficient'
import { getJoinedChannelText } from 'src/menus/joined_channel/joined_channel'
import { getPaymentCompletedText } from 'src/menus/payment_completed/payment_completed'
import { paymentMethodMenu } from 'src/menus/payment_method/payment_method_menu'
import { planMenu } from 'src/menus/plan/plan_menu'
import { getSubscriptionExpiredText } from 'src/menus/subscription_expired/subscription_expired'
import { getSubscriptionWillExpireText } from 'src/menus/subscription_will_expire/subscription_will_expire'

export const replaceMenu = (ctx: BotContext, text: string, menu: InlineKeyboardMarkup) => {
    return ctx.api.editMessageText(ctx.chat?.id ?? 0, ctx.msg?.message_id ?? 0, text, {
        reply_markup: menu,
        parse_mode: 'Markdown',
    })
}

export const addressExpire = (ctx: BotContext) => {
    setTimeout(() => {
        ctx.reply(getAddressExpiredText(ctx), { reply_markup: addressExpiredMenu })
    }, 3000)
}

export const amountInsufficient = (ctx: BotContext) => {
    setTimeout(() => {
        ctx.replyWithMarkdownV1(getAmountInsufficientText(ctx))
    }, 3000)
}

export const showPaymentCompleted = (ctx: BotContext) => {
    setTimeout(() => {
        ctx.replyWithMarkdownV1(getPaymentCompletedText(ctx))
    }, 6000)
}

export const showJoinedChannel = (ctx: BotContext) => {
    setTimeout(() => {
        ctx.replyWithMarkdownV1(getJoinedChannelText(ctx))
    }, 9000)
}

export const showSubscriptionWillExpired = (ctx: BotContext) => {
    setTimeout(() => {
        ctx.reply(getSubscriptionWillExpireText(ctx), { reply_markup: planMenu, parse_mode: 'Markdown' })
    }, 12000)
}

export const showSubscriptionExpired = (ctx: BotContext) => {
    setTimeout(() => {
        ctx.reply(getSubscriptionExpiredText(ctx), { reply_markup: planMenu, parse_mode: 'Markdown' })
    }, 15000)
}
