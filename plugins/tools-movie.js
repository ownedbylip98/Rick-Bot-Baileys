import fetch from 'node-fetch'

let imdbHandler = async (m, { conn, text }) => {
  if (!text) throw 'Bitte gib einen Filmtitel an'

  try {
    let res = await fetch(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(text)}`)

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`)
    }

    let json = await res.json()

    console.log('JSON response:', json)

    let ratings = json.ratings.map(rating => `• *${rating.source}:* ${rating.value}`).join('\n')

    let movieInfo = `*Filminformationen:*\n
     • *Titel:* ${json.title}\n
     • *Jahr:* ${json.year}\n
     • *Staffeln:* ${json.totalseasons}\n
     • *Bewertung:* ${json.rated}\n
     • *Veröffentlicht:* ${json.released}\n
     • *Laufzeit:* ${json.runtime}\n
     • *Genres:* ${json.genres}\n
     • *Regisseur:* ${json.director}\n
     • *Drehbuchautor:* ${json.writer}\n
     • *Schauspieler:* ${json.actors}\n
     • *Handlung:* ${json.plot}\n
     • *Sprachen:* ${json.languages}\n
     • *Land:* ${json.country}\n
     • *Auszeichnungen:* ${json.awards}\n
     • *Metascore:* ${json.metascore}\n
     • *Bewertung:* ${json.rating}\n
     • *Stimmen:* ${json.votes}\n
     • *IMDB ID:* ${json.imdbid}\n
     • *Typ:* ${json.type}\n
     • *DVD:* ${json.dvd}\n
     • *Kasse:* ${json.boxoffice}\n
     • *Produktion:* ${json.production}\n
     • *Webseite:* ${json.website}\n\n
     *Bewertungen:*\n${ratings}`

    // send the movie poster along with the movie information as caption
    await conn.sendFile(m.chat, json.poster, 'poster.jpg', movieInfo, m)
  } catch (error) {
    console.error(error)
    // Handle the error appropriately
  }
}

imdbHandler.help = ['imdb']
imdbHandler.tags = ['tools']
imdbHandler.command = /^(imdb|movie)$/i

export default imdbHandler
