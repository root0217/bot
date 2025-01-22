const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = "8078512100:AAEfHFr-gSeE2AsTS7TB_puNoVNELkSnnXs";
const SECRET_KEY = crypto.createHash("sha256").update(TELEGRAM_BOT_TOKEN).digest();

// Обработка авторизации Web App
app.post("/auth", (req, res) => {
  const { hash, ...userData } = req.body;

  // Проверяем подпись
  const checkString = Object.keys(userData)
    .sort()
    .map((key) => `${key}=${userData[key]}`)
    .join("\n");
  const hmac = crypto.createHmac("sha256", SECRET_KEY).update(checkString).digest("hex");

  if (hmac !== hash) {
    return res.status(403).send("Invalid signature");
  }

  // Если подпись валидна
  console.log("User authenticated:", userData);
  res.send("Authentication successful");
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});