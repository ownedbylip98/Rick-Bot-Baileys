import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Bitte gib einen Pokémon-Namen zum Suchen an.'

  const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`

  const response = await fetch(url)
  const json = await response.json()

  if (!response.ok) {
    throw `Ein Fehler ist aufgetreten: ${json.error}`
  }

  const message = `
*≡ Name:* ${json.name}
*≡ ID:* ${json.id}
*≡ Typ:* ${json.type}
*≡ Fähigkeiten:* ${json.abilities.join(', ')}
*≡ Größe:* ${json.height}
*≡ Gewicht:* ${json.weight}
*≡ Beschreibung:* ${json.description}
`

  // Correctly send the message using the appropriate structure
  conn.sendMessage(m.chat, { text: message }, { quoted: m })
}

handler.help = ['pokedex <pokemon>']
handler.tags = ['anime']
handler.command = /^pokedex/i

export default handler
