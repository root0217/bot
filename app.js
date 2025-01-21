const express = require('express');   
const bodyParser = require('body-parser');   
const axios = require('axios');   

const app = express();   

// Ваш токен бота 
const TELEGRAM_BOT_TOKEN = '8078512100:AAEfHFr-gSeE2AsTS7TB_puNoVNELkSnnXs';   
// URL для взаимодействия с API Telegram 
const TELEGRAM_API = `https://api.telegram.org/bot8078512100:AAEfHFr-gSeE2AsTS7TB_puNoVNELkSnnXs`;   
// URL вашего вебхука на Vercel 
const WEBHOOK_URL = 'https://bookquest-c53tmzp8q-mitsukos-projects.vercel.app/vercel-webhook'; 

// Парсинг JSON-данных 
app.use(bodyParser.json()); 

// Установка вебхука 
axios.post(`${TELEGRAM_API}/setWebhook`, { 
    url: WEBHOOK_URL, 
}) 
.then(() => { 
    console.log('Webhook успешно установлен!'); 
}) 
.catch(err => { 
    console.error('Ошибка установки webhook:', err.response?.data || err.message); 
}); 

// Обработка сообщений от Telegram 
app.post('/vercel-webhook', (req, res) => { 
    console.log('Получен запрос от Telegram:', JSON.stringify(req.body, null, 2)); 

    const message = req.body.message; 

    if (message && message.text) { 
        const chatId = message.chat.id; 
        const userText = message.text; 

        console.log(`Получено сообщение: "${userText}" от чата: ${chatId}`);

        // Отправка ответа пользователю 
        axios.post(`${TELEGRAM_API}/sendMessage`, { 
            chat_id: chatId, 
            text: `Вы написали: ${userText}`,
        }) 
        .then(() => { 
            console.log('Сообщение успешно отправлено!'); 
        }) 
        .catch(err => { 
            console.error('Ошибка отправки сообщения:', err.response?.data || err.message); 
        }); 
    } else {
        console.log('Сообщение не содержит текст.');
    }

    // Возвращаем Telegram статус 200 OK 
    res.sendStatus(200); 
}); 

// Запуск приложения 
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => { 
    console.log(`Сервер запущен на порту ${PORT}`); 
}); 