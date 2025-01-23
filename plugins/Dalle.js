import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `*Dieser Befehl generiert Bilder aus Textvorgaben*\n\n*Beispielverwendung*\n*◉ ${usedPrefix + command} Schöne Anime-Mädchen*\n*◉ ${usedPrefix + command} Elon Musk in pinkem Outfit*`

  try {
    m.reply('*Bitte warte, Bilder werden generiert...*')

    const endpoint = `https://api.gurusensei.workers.dev/dream?prompt=${encodeURIComponent(text)}`
    const response = await fetch(endpoint)

    if (response.ok) {
      const imageBuffer = await response.buffer()
      let imgurl = await uploadImage(imageBuffer)
      await conn.sendButton(m.chat,'Hier ist dein Ergebnis', author, imgurl, [['Script', `.sc`]], null, [['Folge mir', `https://github.com/GlobalTechInfo`]], m)
    } else {
      throw '*Bildgenerierung fehlgeschlagen*'
    }
  } catch {
    throw '*Oops! Etwas ist schief gelaufen bei der Bildgenerierung. Bitte versuche es später erneut.*'
  }
}

handler.help = ['dalle']
handler.tags = ['AI']
handler.command = ['dalle', 'gen', 'imagine', 'openai2']
export default handler



