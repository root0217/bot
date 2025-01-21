from telegram import Bot, InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler, ContextTypes
import pytz

# Ваш токен
TOKEN = "8078512100:AAEfHFr-gSeE2AsTS7TB_puNoVNELkSnnXs"

# URL на ваше Web App
WEB_APP_URL = "https://ваш-домен.com"  # Замените на ваш URL

# Функция-обработчик команды /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("Открыть BookQuest", web_app={"url": WEB_APP_URL})]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        "Добро пожаловать в BookQuest! Нажмите кнопку ниже, чтобы открыть приложение:",
        reply_markup=reply_markup,
    )

# Основной код бота
def main():
    # Создаем приложение
    application = Application.builder().token(TOKEN).build()

    # Добавляем обработчик команды /start
    application.add_handler(CommandHandler("start", start))

    # Запуск бота
    application.run_polling()

if __name__ == "__main__":
    main()
