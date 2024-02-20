import { Bot } from "grammy"
import { SocksProxyAgent } from "socks-proxy-agent";
import { run } from "@grammyjs/runner";


const socksAgent = new SocksProxyAgent(`socks://localhost:${process.env.PROXY_PORT}`);

const bot = new Bot(process.env.BOT_TOKEN || '', {
  client: process.env.NODE_ENV === "production" ? {} : {
    baseFetchConfig: {
      agent: socksAgent,
      compress: true,
    },
  },
})

bot.on("message:text", (ctx) => {
  console.log(ctx.message.text)
  ctx.reply("Echo: " + ctx.message.text)
});

const handle = run(bot);
console.log('Bot is running')

handle?.task?.()?.then(() => {
  console.log("Bot done processing!");
});
