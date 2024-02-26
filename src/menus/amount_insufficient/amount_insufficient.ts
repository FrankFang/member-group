import { BotContext } from 'src/bot'

export const getAmountInsufficientText = (ctx: BotContext) => {
    const { tokenAddress } = ctx.session
    return `
We just received 0.02 ETH from 0x83a127952d266a6ea306c40ac62a4a70668fe3bd, you still need to pay 0.0101 ETH.

Please send 0.0101 ETH to the following address:

\`${tokenAddress}\`

For any assistance, please reach out to the admin @lookonchainsupport.
    `.trim()
}
