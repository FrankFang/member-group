import { bot } from './bot'
bot.api
    .setMyDescription(
        `
What can this bot do?

Welcome to Lookonchain Pro Channel!

What You Can Get in This Channel:

a. Receive tweet content 1-2 minutes faster than Twitter.

b. Alphas sharing only in the paid channel.

c. No chatting in the channel.

d. Try our beta tool for free when it goes live.

e. More alerts from SmartMoney.

f. We will interpret transactions for you when you comment.

For any assistance, please reach out to the admin @lookonchainsupport.
`.trim()
    )
    .then(() => {
        console.log('Bot description updated')
    })
