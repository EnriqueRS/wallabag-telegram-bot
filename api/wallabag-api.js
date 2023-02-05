
const urlAddEntry = `${process.env.WALLABAG_SERVER_URL}/api/entries.epub`

export function postEntry (token, entryUrl) {
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
