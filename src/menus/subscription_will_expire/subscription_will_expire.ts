import { BotContext } from 'src/bot'

export const getSubscriptionWillExpireText = (ctx: BotContext) => {
    return `
Your subscription will expire on Jan 30 at 4:36 pm.

If you want to continue to subscribe to our channel, please select a subscription plan:

Note: If you pay to subscribe to our channel before expiration, the subscription period will be calculated from your expiration time.
  `.trim()
}
