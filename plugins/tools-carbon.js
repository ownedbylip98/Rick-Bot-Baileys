import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, 'Bitte gib einen Text ein, um das Code-Bild zu generieren.', m)
  }

  let codeText = args.join(' ')

  try {
    let response = await fetch('https://carbonara.solopov.dev/api/cook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: codeText,
        backgroundColor: '#1F816D',
      }),
    })

    if (!response.ok) {
      throw new Error('Fehler beim Generieren des Code-Bildes.')
    }

    let imageBuffer = await response.buffer()
    conn.sendFile(m.chat, imageBuffer, 'code.png', 'Hier ist das Code-Bild:', m)
  } catch (error) {
    console.error(error)
    conn.reply(m.chat, 'Ein Fehler ist beim Generieren des Code-Bildes aufgetreten.', m)
  }
}

handler.help = ['.carbon <code>']
handler.tags = ['tools']
handler.command = /^carbon$/i

export default handler
