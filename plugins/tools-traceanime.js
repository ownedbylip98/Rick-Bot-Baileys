import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn }) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (!mime.startsWith('image')) {
      throw '*Antworte auf ein Bild*'
    }

    let data = await q.download()
    let image = await uploadImage(data)

    let apiUrl = `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(image)}`
    console.log('API URL:', apiUrl)

    let response = await fetch(apiUrl)
    let result = await response.json()
    console.log('API Response:', result)

    if (!result || result.error || result.result.length === 0) {
      throw '*Fehler: Konnte den Anime nicht verfolgen.*'
    }

    let { anilist, from, to, similarity, video, episode } = result.result[0]
    let animeTitle = anilist.title ? anilist.title.romaji || anilist.title.native : 'Unbekannter Titel'

    let message = `*Anime:* ${animeTitle}\n`

    if (anilist.synonyms && anilist.synonyms.length > 0) {
      message += `*Synonyme:* ${anilist.synonyms.join(', ')}\n`
    }

    message += `*Ähnlichkeit:* ${similarity.toFixed(2)}%\n`
    message += `*Zeit:* ${formatDuration(from * 1000)} - ${formatDuration(to * 1000)}\n`

    if (episode) {
      message += `*Episode:* ${episode}\n`
    }

    console.log('Anime-Informationen:', {
      animeTitle,
      synonyms: anilist.synonyms ? anilist.synonyms.join(', ') : 'Nicht verfügbar',
      similarity,
      timestamp: `${formatDuration(from * 1000)} - ${formatDuration(to * 1000)}`,
      video,
      episode,
    })

    // Sende das Video mit Anime-Informationen als Beschriftung
    await conn.sendFile(m.chat, video, 'anime.mp4', message, m)
  } catch (error) {
    console.error('Fehler:', error)
    m.reply('*Fehler: Konnte den Anime nicht verfolgen oder das Video nicht senden.*')
  }
}

function formatDuration(ms) {
  let seconds = Math.floor((ms / 1000) % 60)
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

handler.help = ['trace']
handler.tags = ['anime']
handler.command = /^trace$/i

export default handler
