export interface SessionData {
    chatId?: number
    orderTypes?: Api.OrderType[]
    orderType?: number
    tokenName?: string
    tokenAddress?: string
    walletToCancel?: string
    order?: Api.Order
    transactionHash?: string
}

export const initial = (): SessionData => {
    return {}
}
