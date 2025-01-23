import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Bitte gib ein Wort zum Suchen ein.'

  const url = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(text)}`

  const response = await fetch(url)
  const json = await response.json()

  if (!response.ok) {
    throw `Ein Fehler ist aufgetreten: ${json.message}`
  }

  if (!json.list.length) {
    throw 'Wort nicht im Wörterbuch gefunden.'
  }

  const firstEntry = json.list[0]
  const definition = firstEntry.definition
  const example = firstEntry.example ? `*Beispiel:* ${firstEntry.example}` : ''

  const message = `*Wort:* ${text}\n*Definition:* ${definition}\n${example}`
  conn.sendMessage(m.chat, { text: message }, 'extendedTextMessage', { quoted: m })
}

handler.help = ['define <wort>']
handler.tags = ['tools']
handler.command = /^define/i

export default handler
