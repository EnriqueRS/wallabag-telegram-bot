
import env from '../env/env.js'

const baseUrl = env.WALLABAG_SERVER_URL
const urlAddEntry = baseUrl + '/api/entries.epub'
const authUrl = baseUrl + '/oauth/v2/token'

export async function postEntry (token, urlEntry) {
  const encodedParamsPostEntry = new URLSearchParams()

  encodedParamsPostEntry.set('url', urlEntry)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`
    },
    body: encodedParamsPostEntry
  }

  await fetch(urlAddEntry, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err))
}

export function getToken () {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: getEncodedParams()
  }

  return fetch(authUrl, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
      const token = json.access_token
      return token
    })
    .catch((err) => console.error('error:' + err))
}

function getEncodedParams () {
  const encodedParams = new URLSearchParams()

  encodedParams.set('client_id', env.WALLABAG_CLIENT_ID)
  encodedParams.set('client_secret', env.WALLABAG_SECRET_ID)
  encodedParams.set('username', env.WALLABAG_USERNAME)
  encodedParams.set('password', env.WALLABAG_PASSWORD)
  encodedParams.set('grant_type', 'password')

  return encodedParams
}
