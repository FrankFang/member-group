import { apiCreateOrder } from '@/api/api'
import { getSelectedPlan, getSelectedToken } from '@/lib/menu_helper'
import dayjs from 'dayjs'
import { BotContext } from 'src/bot'

export const getPaymentAddressText = async (ctx: BotContext) => {
    const plan = getSelectedPlan(ctx)
    const token = getSelectedToken(ctx)
    const result = await apiCreateOrder({
        chat_id: ctx.chat?.id ?? 0,
        tokenAddress: token?.token ?? '',
        type: plan?.type ?? 0,
    })
    ctx.session.order = result
    const address = result.wallet
    const amount = token?.amount
    const threeHoursLater = dayjs().add(3, 'hour').format('MMM D, YYYY HH:mm:ss')
    return `
Please send ${amount} USDT(BEP-20) to the following address on BSC Network:

[${address}](https://bscscan.com/address/${address})

This unique address is valid only for \`3 hours\` and will expire at ${threeHoursLater}.

❗️Please do not transfer tokens to this address after ${threeHoursLater}.
`.trim()
}
