import fetch from 'node-fetch'

let gitagptHandler = async (m, { text, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Bitte gib einen Text ein oder zitiere eine Nachricht, um eine Antwort zu erhalten. Beachte, dass GitaGPT sich noch in der Testphase befindet und daher manchmal ungenaue Antworten generieren kann.`
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat)
    const prompt = encodeURIComponent(text)
    const endpoint = `https://ultimetron.guruapi.tech/gita?prompt=${prompt}`

    const response = await fetch(endpoint)
    const data = await response.json()
    const result = data.completion

    m.reply(result)
  } catch (error) {
    console.error('Fehler:', error)
    throw `*FEHLER*`
  }
}
gitagptHandler.help = ['gitagpt']
gitagptHandler.tags = ['AI']
gitagptHandler.command = ['gitagpt']
gitagptHandler.diamond = false

export default gitagptHandler
