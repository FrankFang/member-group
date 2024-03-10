import { apiCreateOrder } from '@/api/api'
import { getSelectedPlan, getSelectedToken } from '@/lib/menu_helper'
import { BotContext } from 'src/bot'

export const getPaymentAddressText = async (ctx: BotContext) => {
    const plan = getSelectedPlan(ctx)
    const token = getSelectedToken(ctx)
    const result = await apiCreateOrder({
        chat_id: ctx.chat?.id ?? 0,
        tokenAddress: token?.token ?? '',
        type: plan?.type ?? 0,
    })
    const address = result.data.token
    const amount = token?.amount
    const transactionStatus = 'https://example.com/'
    return `
Please send ${amount} ETH (Ether) (exact amount, after commissions) to the following address:

\`${address}\`

This unique address is valid only for 3 hours. Your payment will be processed by CoinPayments. You can check your transaction status here:

[Transaction Status](${transactionStatus})
`.trim()
}
