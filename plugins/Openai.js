import fetch from 'node-fetch'

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Bitte gib einen Text ein oder zitiere eine Nachricht, um eine Antwort zu erhalten.`
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text
  }

  try {
    m.react(rwait)
    
    conn.sendPresenceUpdate('composing', m.chat)
    const prompt = encodeURIComponent(text)

    const guru1 = `https://api.gurusensei.workers.dev/llama?prompt=${prompt}`

    try {
      let response = await fetch(guru1)
      let data = await response.json()
      let result = data.response.response

      if (!result) {
        throw new Error('Keine gültige JSON-Antwort von der ersten API')
      }

      // Send a simple message instead of a button
      await conn.sendMessage(m.chat, { text: result }, { quoted: m })
      m.react(done)
    } catch (error) {
      console.error('Fehler von der ersten API:', error)

      const guru2 = `https://ultimetron.guruapi.tech/gpt3?prompt=${prompt}`

      let response = await fetch(guru2)
      let data = await response.json()
      let result = data.completion

      // Send a simple message instead of a button
      await conn.sendMessage(m.chat, { text: result }, { quoted: m })
      m.react(done)
    }
  } catch (error) {
    console.error('Fehler:', error)
    throw `*FEHLER*`
  }
}

handler.help = ['chatgpt']
handler.tags = ['AI']
handler.command = ['bro', 'chatgpt', 'ai', 'gpt']

export default handler
