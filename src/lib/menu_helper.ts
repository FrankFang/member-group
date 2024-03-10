import { InlineKeyboardMarkup, Message } from 'grammy/types'
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

export const autoDeleteAddress = (ctx: BotContext, messageId: number) => {
    const chatId = ctx.chat?.id ?? 0
    setTimeout(() => {
        ctx.api.deleteMessage(chatId, messageId)
    }, 30 * 1000)
}

export const afterSendingAddress = (ctx: BotContext, lastMessage: Message) => {
    // 这里最好把当前的 ctx.msg.id 存到 redis，方便 3 小时后删除
    autoDeleteAddress(ctx, lastMessage.message_id)
    // 提示地址过期
    addressExpire(ctx)
    // 提示金额不足
    amountInsufficient(ctx)
    // 提示支付完成
    showPaymentCompleted(ctx)
    // 提示加入频道
    showJoinedChannel(ctx)
    // 提示订阅即将过期
    showSubscriptionWillExpired(ctx)
    // 提示订阅已过期
    showSubscriptionExpired(ctx)
}

export const getSelectedPlan = (ctx: BotContext) => {
    const { orderType, orderTypes } = ctx.session
    const selected = orderTypes?.find((o) => o.type === orderType)
    if (!selected) return null
    return selected
}
export const getSelectedToken = (ctx: BotContext) => {
    const selectedPlan = getSelectedPlan(ctx)
    const selectedToken = selectedPlan?.tokens.find((t) => t.name === ctx.session.tokenName)
    return selectedToken
}
