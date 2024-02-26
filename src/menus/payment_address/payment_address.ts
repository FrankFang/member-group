import { BotContext } from 'src/bot'

export const getPaymentAddressText = (ctx: BotContext) => {
    const { token, tokenAddress } = ctx.session
    const amount = 0.03101
    const transactionStatus = 'https://example.com/'
    return `
Please send ${amount} ETH (Ether) (exact amount, after commissions) to the following address:

\`${tokenAddress}\`

This unique address is valid only for 3 hours. Your payment will be processed by CoinPayments. You can check your transaction status here:

[Transaction Status](${transactionStatus})
`.trim()
}
