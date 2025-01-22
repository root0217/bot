const { Telegraf } = require("telegraf");
const express = require("express");

const BOT_TOKEN = "8078512100:AAEfHFr-gSeE2AsTS7TB_puNoVNELkSnnXs";
const WEBHOOK_URL = "https://bot-o4sx.onrender.com";
const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(express.json()); // Для обработки JSON-тела запросов

// Команда /start
bot.command("start", (ctx) => {
  ctx.reply("Добро пожаловать в BookQuest! Нажмите на кнопку ниже, чтобы открыть приложение.", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Открыть приложение", web_app: { url: "https://bot-o4sx.onrender.com" } }],
      ],
    },
  });
});

// Устанавливаем webhook
bot.telegram.setWebhook(`${WEBHOOK_URL}/webhook/${BOT_TOKEN}`);
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