import fetch from 'node-fetch'

let itunesHandler = async (m, { conn, text }) => {
  if (!text) throw 'Bitte gib einen Liednamen an'

  try {
    let res = await fetch(`https://api.popcat.xyz/itunes?q=${encodeURIComponent(text)}`)

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`)
    }

    let json = await res.json()

    console.log('JSON response:', json)

    let songInfo = `*Liedinformationen:*\n
     • *Name:* ${json.name}\n
     • *Künstler:* ${json.artist}\n
     • *Album:* ${json.album}\n
     • *Veröffentlichungsdatum:* ${json.release_date}\n
     • *Preis:* ${json.price}\n
     • *Länge:* ${json.length}\n
     • *Genre:* ${json.genre}\n
     • *URL:* ${json.url}`

    // Check if thumbnail is present, then send it with songInfo as caption
    if (json.thumbnail) {
      await conn.sendFile(m.chat, json.thumbnail, 'thumbnail.jpg', songInfo, m)
    } else {
      m.reply(songInfo)
    }
  } catch (error) {
    console.error(error)
    // Handle the error appropriately
  }
}

itunesHandler.help = ['itunes']
itunesHandler.tags = ['tools']
itunesHandler.command = /^(itunes)$/i

export default itunesHandler
