import { BotContext } from '@/bot'
import EventSource from 'eventsource'
import { Bot } from 'grammy'

type Event = { data: { id: number; to: number; type: string; message: string } }

let eventSource: EventSource
export const initSse = (bot: Bot<BotContext>) => {
    const botId = getBotId()
    const url = process.env.API_BASE_URL + `/subscription/notification/customer/${botId}` // 替换为你的 SSE 服务器地址
    eventSource = new EventSource(url)
    eventSource.onmessage = function (event: Event) {
        switch (event.data.type) {
            case 'half_send':
            case 'all_send':
            case 'invite_link':
            case 'plan_expired_24h':
            case 'plan_expired':
                bot.api.sendMessage(event.data.to, event.data.message)
                break
        }
    }
    eventSource.onerror = function () {
        console.error('ERROR!')
    }
}

function getBotId() {
    const token = process.env.BOT_TOKEN
    if (!token) throw new Error('BOT_TOKEN is not set')
    const index = token.indexOf(':')
    return token.substring(0, index)
}
