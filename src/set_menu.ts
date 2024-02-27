import { bot } from './bot'
bot.api
    .setMyCommands([
        {
            command: 'start',
            description: 'Start the bot',
        },
    ])
    .then(() => {
        console.log('Bot commands updated')
    })
