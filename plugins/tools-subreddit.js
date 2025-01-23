import fetch from 'node-fetch'

let subredditHandler = async (m, { conn, text }) => {
  if (!text) throw 'Bitte gib einen Subreddit-Namen an'

  try {
    let res = await fetch(`https://api.popcat.xyz/subreddit/${encodeURIComponent(text)}`)

    if (!res.ok) {
      throw new Error(`API-Anfrage ist fehlgeschlagen mit Status ${res.status}`)
    }

    let json = await res.json()

    console.log('JSON-Antwort:', json)

    let subredditInfo = `*Subreddit-Informationen:*\n
     • *Name:* ${json.name}\n
     • *Titel:* ${json.title}\n
     • *Aktive Benutzer:* ${json.active_users}\n
     • *Mitglieder:* ${json.members}\n
     • *Beschreibung:* ${json.description}\n
     • *Erlaubt Videos:* ${json.allow_videos ? 'Ja' : 'Nein'}\n
     • *Erlaubt Bilder:* ${json.allow_images ? 'Ja' : 'Nein'}\n
     • *Über 18:* ${json.over_18 ? 'Ja' : 'Nein'}\n
     • *URL:* ${json.url}`

    // if icon is not null or undefined, send it along with the subreddit information as caption
    // otherwise, only send the subreddit information
    if (json.icon) {
      await conn.sendFile(m.chat, json.icon, 'icon.jpg', subredditInfo, m)
    } else {
      m.reply(subredditInfo)
    }
  } catch (error) {
    console.error(error)
    // Handle the error appropriately
  }
}

subredditHandler.help = ['subreddit']
subredditHandler.tags = ['tools']
subredditHandler.command = /^(subreddit|reddit)$/i

export default subredditHandler
