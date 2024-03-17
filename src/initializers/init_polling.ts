import { BotContext } from '@/bot'
import { Bot } from 'grammy'
import { httpClient } from '@/lib/http_client'

type PollingResponse = {
    id: number
    message: null,
} | {
    id: number
    message: string,
    type: string
    to: number
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
        switch (result.type) {
            case 'half_send':
            case 'all_send':
            case 'invite_link':
            case 'plan_expired_24h':
            case 'plan_expired':
                try {
                    await bot.api.sendMessage(result.to, result.message)
                } catch (err) {
                    console.log(err)
                }
                break
            case 'heartbeat':
                console.log('heartbeat')
                break
            default:
                break
        }
        timer = setTimeout(run, 0)
    }
    run()
}

function getBotId() {
    if (process.env.BOT_ID) {
        return process.env.BOT_ID
    }
    const token = process.env.BOT_TOKEN
    if (!token) throw new Error('BOT_TOKEN is not set')
    const index = token.indexOf(':')
    return token.substring(0, index)
}
