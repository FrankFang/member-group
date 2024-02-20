import { Bot } from "grammy"

const bot = new Bot(process.env.BOT_TOKEN) // <-- place your bot token in this string

bot.on("message:text", (ctx) => ctx.reply("Echo: " + ctx.message.text));

bot.start();
