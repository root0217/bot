const { Telegraf } = require("telegraf");
const express = require("express");

// Замените на токен вашего бота
const BOT_TOKEN = "8078512100:AAEfHFr-gSeE2AsTS7TB_puNoVNELkSnnXs";
const bot = new Telegraf(BOT_TOKEN);

const app = express();

// Команда /start
bot.command("start", (ctx) => {
  ctx.reply("Добро пожаловать в BookQuest! Нажмите на кнопку ниже, чтобы открыть приложение.", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Открыть приложение", web_app: { url: "https://your-web-app-url.com" } }],
      ],
    },
  });
});

// Запускаем бота
bot.launch();

// Веб-сервер для проверки (на случай деплоя)
app.get("/", (req, res) => {
  res.send("Бот работает!");
});
app.listen(3000, () => console.log("Сервер запущен на http://localhost:3000"));