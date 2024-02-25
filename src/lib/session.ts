import { Bot, Context, session, SessionFlavor } from 'grammy'

export interface SessionData {
    plan?: 'monthly' | 'quarterly' | 'yearly'
}
export type BotContext = Context & SessionFlavor<SessionData>

export const initial = (): SessionData => {
    return { plan: undefined }
}
