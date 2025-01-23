import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) throw '✳️ Was möchtest du auf YouTube suchen?'
  await m.react('⏳'); // React with a loading emoji

  try {
    const query = encodeURIComponent(text)
    const response = await axios.get(`https://weeb-api.vercel.app/ytsearch?query=${query}`)
    const results = response.data

    if (results.length === 0) {
      throw 'Keine Ergebnisse für die angegebene Suche gefunden.'
    }

    // Get at least 10 results, but if there are fewer, use all of them
    const resultsToSend = results.slice(0, 10)

    let message = 'Hier sind die Top-Ergebnisse:\n\n'
    resultsToSend.forEach((result, index) => {
      message += `
乂 ${index + 1}. ${result.title}
乂 *Link* : ${result.url}
乂 *Dauer* : ${result.timestamp}
乂 *Veröffentlicht* : ${result.ago}
乂 *Aufrufe:* ${result.views}

      `
    })
    await m.react('✅'); // React with a done emoji

    // Send the message along with the thumbnail of the first result
    conn.sendFile(m.chat, resultsToSend[0].thumbnail, 'yts.jpeg', message, m)

  } catch (error) {
    console.error(error)
    throw 'Ein Fehler ist bei der Suche nach YouTube-Videos aufgetreten.'
  }
}

handler.help = ['ytsearch']
handler.tags = ['downloader']
handler.command = ['ytsearch', 'yts']

export default handler
