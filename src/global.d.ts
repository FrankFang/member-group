declare namespace Api {
    interface Response<T> {
        code: number
        msg: string
        data: T
    }
    interface OrderType {
        name: string
        type: number
        price: number
        tokens: OrderToken[]
    }

    interface OrderToken {
        name: string
        token: string
        amount: number
    }
    interface PaymentTarget {
        wallet: string
        token: string
        amount: number
    }
}
