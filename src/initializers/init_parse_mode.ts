import { hydrateReply, parseMode } from '@grammyjs/parse-mode'

import type { ParseModeFlavor } from '@grammyjs/parse-mode'
import { Bot } from 'grammy'
import { BotContext } from 'src/bot'

export const initParseMode = (bot: Bot<BotContext>) => {
    // Install the plugin.
    bot.use(hydrateReply)
    // Sets default parse_mode for ctx.reply
    // https://github.com/grammyjs/parse-mode/blob/49ba35bac208536edfa6e8d4ea665ea0f7fff522/src/transformer.ts#L3
    // 此处应该有 bug，即使设置默认模式是 Markdown，其默认模式也还是 MarkdownV2
    bot.api.config.use(parseMode('Markdown'))
}
