import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const name = conn.getName(m.sender)
  if (!text) {
    throw `Hi *${name}*, möchtest du reden? Antworte mit *${usedPrefix + command}* (deine Nachricht)\n\n📌 Beispiel: *${usedPrefix + command}* Hi Bot`
  }

  m.react('🗣️')

  const msg = encodeURIComponent(text)

  const res = await fetch(`https://ultimetron.guruapi.tech/rekha?prompt=${msg}`)

  const json = await res.json()

  let reply = json.result.response
  m.reply(reply)
}

handler.help = ['bot']
handler.tags = ['fun']
handler.command = /^(alexa)/i

export default handler
