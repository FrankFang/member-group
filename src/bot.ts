import { Bot } from "grammy"
import { SocksProxyAgent } from "socks-proxy-agent";

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
  console.log('hi')
  ctx.reply("Echo: " + ctx.message.text)
});

bot.start();
console.log('Bot is running')
