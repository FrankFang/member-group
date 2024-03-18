import { getBotId } from '@/initializers/init_polling'
import { httpClient } from '@/lib/http_client'

export const apiGetPlans = async () => {
    return httpClient.get<{ order_types: Api.OrderType[] }>('/subscription/order/types')
}

export const apiCreateOrder = async (params: { chat_id: number; tokenAddress: string; type: number }) => {
    const { chat_id: uid, tokenAddress: token, type } = params
    return httpClient.get<Api.Order>('/subscription/order/create', { botid: getBotId(), uid, token, type })
}
