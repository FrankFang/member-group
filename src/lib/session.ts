export interface SessionData {
    chatId?: number
    orderTypes?: Api.OrderType[]
    orderType?: number
    tokenName?: string
    tokenAddress?: string
    transactionHash?: string
}

export const initial = (): SessionData => {
    return {}
}
