import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const WALLABAG_CLIENT_ID = process.env.WALLABAG_CLIENT_ID
const WALLABAG_SECRET_ID = process.env.WALLABAG_SECRET_ID
const WALLABAG_USERNAME = process.env.WALLABAG_USERNAME
const WALLABAG_PASSWORD = process.env.WALLABAG_PASSWORD
const WALLABAG_SERVER_URL = process.env.WALLABAG_SERVER_URL

const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export default {
  WALLABAG_CLIENT_ID,
  WALLABAG_SECRET_ID,
  WALLABAG_USERNAME,
  WALLABAG_PASSWORD,
  WALLABAG_SERVER_URL,
  TELEGRAM_API_KEY,
  TELEGRAM_CHAT_ID
}
