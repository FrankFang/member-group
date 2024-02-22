import { Bot, Context, session, SessionFlavor } from 'grammy'

export interface SessionData {
    pizzaCount: number
}
export type BotContext = Context & SessionFlavor<SessionData>

export const initial = (): SessionData => {
    return { pizzaCount: 0 }
}
