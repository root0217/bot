const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Используем body-parser для обработки POST-запросов
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Токен вашего Telegram бота
const TELEGRAM_BOT_TOKEN = '8078512100:AAEfHFr-gSeE2AsTS7TB_puNoVNELkSnnXs';
const TELEGRAM_API_URL = `https://bot-o4sx.onrender.com/webhook/8078512100:AAEfHFr-gSeE2AsTS7TB_puNoVNELkSnnXs`;

// Секретный ключ для проверки подписи
const SECRET_KEY = crypto.createHash('sha256').update(TELEGRAM_BOT_TOKEN).digest();

// Обработка авторизации
app.post('/auth', (req, res) => {
    const { hash, ...userData } = req.body;

    // Проверяем подпись
    const checkString = Object.keys(userData)
        .sort()
        .map((key) => `${key}=${userData[key]}`)
        .join('\n');
    const hmac = crypto.createHmac('sha256', SECRET_KEY).update(checkString).digest('hex');

    if (hmac !== hash) {
        return res.status(403).send('Invalid signature');
    }

    // Если подпись валидна, отправляем успешный ответ
    console.log('User authenticated:', userData);
    res.send('Authentication successful');
});

// Обработка Webhook от Telegram
app.post(`/webhook/${TELEGRAM_BOT_TOKEN}`, async (req, res) => {
    const message = req.body.message;

    if (message) {
        const chatId = message.chat.id;
        const text = message.text;

        // Обработка команды /start
        if (text === '/start') {
            await sendMessage(chatId, 'Привет! Добро пожаловать в BookQuest.');
        } else {
            await sendMessage(chatId, `Вы написали: ${text}`);
        }
    }

    res.sendStatus(200);
});

// Функция для отправки сообщения в Telegram
async function sendMessage(chatId, text) {
    try {
        await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
            chat_id: chatId,
            text: text,
        });
    } catch (error) {
        console.error('Ошибка отправки сообщения:', error.response.data);
    }
}

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    // Устанавливаем Webhook для Telegram
    try {
        const webhookUrl = `https://bot-o4sx.onrender.com/webhook/${TELEGRAM_BOT_TOKEN}`;
        const response = await axios.post(`${TELEGRAM_API_URL}/setWebhook`, {
            url: webhookUrl,
        });
        console.log('Webhook установлен:', response.data);
    } catch (error) {
        console.error('Ошибка установки Webhook:', error.response.data);
    }
});