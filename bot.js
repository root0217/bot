const { Telegraf } = require("telegraf");
const express = require("express");

const BOT_TOKEN = "8078512100:AAEfHFr-gSeE2AsTS7TB_puNoVNELkSnnXs"; // Ваш токен
const WEBHOOK_URL = "https://bot-o4sx.onrender.com"; // Ваш URL Render

const bot = new Telegraf(BOT_TOKEN);
const app = express();

// Команда /start
bot.command("start", (ctx) => {
  ctx.reply("Добро пожаловать в BookQuest! Нажмите на кнопку ниже, чтобы открыть приложение.", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Открыть приложение", web_app: { url: WEBHOOK_URL } }],
      ],
    },
  });
});

// Устанавливаем webhook
bot.telegram.setWebhook(`${WEBHOOK_URL}/webhook/${BOT_TOKEN}`);

// Обработка запросов от Telegram через webhook
app.use(bot.webhookCallback(`/webhook/${BOT_TOKEN}`));

// Проверка работы сервера
app.get("/", (req, res) => {
  res.send("Бот работает!");
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});