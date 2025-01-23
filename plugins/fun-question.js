import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `✳️ *Beispiel:*\n\n*${usedPrefix + command}* Bin ich hässlich?`

  m.react('🫣')
  conn.sendPresenceUpdate('composing', m.chat)

  let res = await fetch(
    `https://gurugpt.cyclic.app/gpt4?prompt=${encodeURIComponent(text)}&model=llama`
  )
  let json = await res.json()

  if (json && json.data) {
    const answer = json.data

    m.reply(`≡ *ANTWORT*
    
▢ *Frage:* ${text}
▢ *Antwort:* ${answer}`)
  } else {
    throw 'Keine gültige Antwort von der API erhalten.'
  }
}

handler.help = ['question']
handler.tags = ['fun']
handler.command = ['question', 'q']

export default handler
