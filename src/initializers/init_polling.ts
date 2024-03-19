import { BotContext } from '@/bot'
import { Bot } from 'grammy'
import { httpClient } from '@/lib/http_client'
import { apiGetPlans } from '@/api/api'
import { planMenu } from '@/menus/plan/plan_menu'
import { addressExpiredMenu } from '@/menus/address_expired/address_expired'

type PollingResponse =
    | {
          id: number
          message: null
      }
    | {
          id: number
          message: {
              type: string
              to: number
              message: string
              id: number
          }
      }

export const initPolling = (bot: Bot<BotContext>) => {
    const botId = getBotId()
    const url = process.env.API_BASE_URL + `/subscription/notification/pull`
    let timer
    const run = async () => {
        const result = await httpClient.get<PollingResponse>(url, { botid: botId })
        console.log(result)
        if (result.message === null) {
            timer = setTimeout(run, 3000)
            return
        }
        try {
            switch (result.message.type) {
                case 'half_send':
                case 'all_send':
                case 'invite_link':
                case 'user_joined':
                    await bot.api.sendMessage(result.message.to, result.message.message, { parse_mode: 'HTML' })
                    break
                case 'plan_expired_24h':
                case 'plan_expired':
                    const orderTypes = (await apiGetPlans()).order_types
                    await bot.api.sendMessage(result.message.to, result.message.message, {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: orderTypes.map((orderType) => [
                                {
                                    text: orderType.name,
                                    callback_data: `choose_plan_${orderType.type}`,
                                },
                            ]),
                        },
                    })
                    break
                case 'deposite_expired':
                    await bot.api.sendMessage(result.message.to, result.message.message, {
                        parse_mode: 'HTML',
                        // reply_markup: addressExpiredMenu, // 会报错，说我没有 use 过这个 menu
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Resend billing address',
                                        callback_data: 'resend_address',
                                    },
                                ],
                            ],
                        },
                    })
                    break
                case 'heartbeat':
                    break
                default:
                    if (result.message.to && result.message.message) {
                        await bot.api.sendMessage(result.message.to, result.message.message, { parse_mode: 'HTML' })
                    }
                    break
            }
        } catch (err) {
            console.log(err)
        }
        timer = setTimeout(run, 0)
    }
    run()
}

export function getBotId() {
    if (process.env.BOT_ID) {
        return process.env.BOT_ID
    }
    const token = process.env.BOT_TOKEN
    if (!token) throw new Error('BOT_TOKEN is not set')
    const index = token.indexOf(':')
    return token.substring(0, index)
}
