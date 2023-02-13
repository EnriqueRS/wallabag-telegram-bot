import fetch from 'node-fetch'
import TelegramBot from 'node-telegram-bot-api'

const token = '<TELEGRAM_API_KEY>'

const bot = new TelegramBot(token, { polling: true })
const encodedParams = new URLSearchParams()

encodedParams.set('grant_type', 'password')
encodedParams.set(
  'client_id',
  '<CLIENT_ID>'
)
encodedParams.set(
  'client_secret',
  '<CLIENT_SECRET>'
)
encodedParams.set('password', 'wallabag')
encodedParams.set('username', 'wallabag')

const url = '<WALLABAG_SERVER_URL>/oauth/v2/token'
const urlAddEntry = '<WALLABAG_SERVER_URL>/api/entries.epub'

const options = {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: encodedParams
}

function postEntry (token, entryUrl) {
  const encodedParamsPostEntry = new URLSearchParams()

  encodedParamsPostEntry.set('url', entryUrl)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`
    },
    body: encodedParamsPostEntry
  }

  fetch(urlAddEntry, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err))
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
