import fetch from 'node-fetch'

let yoMamaJokeHandler = async (m, { conn, text }) => {
  try {
    let res = await fetch(`https://yomamaindra.onrender.com/jokes`)

    if (!res.ok) {
      throw new Error(`API-Anfrage ist fehlgeschlagen mit Status ${res.status}`)
    }

    let json = await res.json()

    console.log('JSON-Antwort:', json)

    let yoMamaJoke = `${json.joke}`

    m.reply(yoMamaJoke)
  } catch (error) {
    console.error(error)
  }
}

yoMamaJokeHandler.help = ['yomamawitz']
yoMamaJokeHandler.tags = ['spaß']
yoMamaJokeHandler.command = /^(yomamawitz|yomama|terimummy)$/i

export default yoMamaJokeHandler
