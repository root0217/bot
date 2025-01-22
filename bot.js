const { Telegraf } = require("telegraf");
const express = require("express");

const BOT_TOKEN = "8078512100:AAEfHFr-gSeE2AsTS7TB_puNoVNELkSnnXs";
const bot = new Telegraf(BOT_TOKEN);
const app = express();

// Команда /start
bot.command("start", (ctx) => {
  ctx.reply("Добро пожаловать в BookQuest! Нажмите на кнопку ниже, чтобы открыть приложение.", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Открыть приложение", web_app: { url: "https://bot-o4sx.onrender.com/" } }],
      ],
    },
  });
});

// Webhook (Render URL)
const WEBHOOK_URL = "https://your-render-url.onrender.com";
bot.telegram.setWebhook(`${WEBHOOK_URL}/bot${BOT_TOKEN}`);

// Обработка запросов от Telegram
app.use(bot.webhookCallback(`/bot${BOT_TOKEN}`));

// Проверка работы сервера
app.get("/", (req, res) => {
  res.send("Бот работает!");
});

// Запуск сервера
app.listen(3000, () => {
  console.log("Сервер запущен на http://localhost:3000");
});