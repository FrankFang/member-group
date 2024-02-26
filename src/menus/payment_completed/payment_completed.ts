import { BotContext } from 'src/bot'

export const getPaymentCompletedText = (ctx: BotContext) => {
    const { transactionHash } = ctx.session
    return `
✅ You have completed the payment.
Check [transaction hash](${transactionHash}).

Please join the pro channel through the invitation link below:
https://t.me/+0uM23Y5ZfFJhZDE1
    `.trim()
}
