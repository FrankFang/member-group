export interface SessionData {
    chatId?: number
    plan?: 'monthly' | 'quarterly' | 'yearly'
    token?: 'USDT' | 'USDC'
    tokenAddress?: string
    transactionHash?: string
}

export const initial = (): SessionData => {
    return { plan: undefined }
}
