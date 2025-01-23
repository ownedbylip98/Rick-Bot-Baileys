import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

let msg = `Thailand Hot Girl 🥵🔥`
let endpoint = `https://shizoapi.onrender.com/api/pies/thailand?apikey=${shizokeys}`
const response = await fetch(endpoint);
if (response.ok) {
      const imageBuffer = await response.buffer();
      await conn.sendFile(m.chat, imageBuffer, 'OwnedbyLIP.techie.error.png', msg, m, null, rpwp);
    } else {
      throw 'Fehler beim Abrufen des Bildes'
    }
}

handler.tags = ['pies', 'sfw']
handler.help = handler.command = ['thaipie']

export default handler
