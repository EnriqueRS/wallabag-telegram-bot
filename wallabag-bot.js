import fetch from 'node-fetch'
import TelegramBot from 'node-telegram-bot-api'
import { postEntry } from './api/wallabag-api.js'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const token = process.env.TELEGRAM_API_KEY
console.log('token: ' + token)

const bot = new TelegramBot(token, { polling: true })
const encodedParams = new URLSearchParams()

encodedParams.set('grant_type', 'password')
encodedParams.set(
  'client_id', process.env.WALLABAG_CLIENT_ID
)
encodedParams.set(
  'client_secret', process.env.WALLABAG_CLIENT_SECRET
)
encodedParams.set('password', 'wallabag')
encodedParams.set('username', 'wallabag')

const url = `${process.env.WALLABAG_SERVER_URL}/oauth/v2/token`

const options = {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: encodedParams
}

bot.onText(/^(http|https):\/\//, (msg, match) => {
  const chatId = msg.chat.id
  if (chatId !== 7182185) return

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      const token = json.access_token
      postEntry(token, msg.text)
        .catch((err) => console.error('error:' + err))

      bot.sendMessage(chatId, 'ok')
    })
    .catch((err) => console.error('error:' + err))
})
