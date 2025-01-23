import fetch from 'node-fetch'

let handler = async (m, { conn, args, text }) => {
  if (!text) throw '*Bitte gib eine URL oder einen Link an, um ihn zu kürzen.*'

  let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text()

  if (!shortUrl1) throw `*Fehler: Konnte keine Kurz-URL erstellen.*`

  let done =
    `*KURZE URL ERSTELLT!!*\n\n*Originaler Link:*\n${text}\n*Verkürzte URL:*\n${shortUrl1}`.trim()

  m.reply(done)
}

handler.help = ['tinyurl', 'shorten'].map(v => v + ' <link>')
handler.tags = ['tools']
handler.command = /^(tinyurl|short|acortar|corto)$/i
handler.fail = null

export default handler
