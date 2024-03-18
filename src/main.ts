import { run } from '@grammyjs/runner'
import { bot } from 'src/bot'
const handle = run(bot)
console.log('Bot is running')

handle?.task?.()?.then(() => {
    console.log('Bot done processing!')
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})