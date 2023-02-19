import TelegramBot from 'node-telegram-bot-api'
import { postEntry, getToken } from './api/wallabag-api.js'
import env from './env/env.js'

const telegramToken = env.TELEGRAM_API_KEY
const chatId = env.TELEGRAM_CHAT_ID
console.log('telegramToken: ' + telegramToken)
console.log('chatId: ' + chatId)
const bot = new TelegramBot(telegramToken, { polling: true })

bot.onText(/^(http|https):\/\//, (msg, match) => {
  if (msg.chat.id !== +chatId) return
  getToken().then((token) => {
    console.log('token: ' + token)
    postEntry(token, msg.text)
      .catch((err) => console.error('error:' + err))
    bot.sendMessage(chatId, 'ok')
  }).catch((err) => bot.sendMessage(chatId, err))
})
