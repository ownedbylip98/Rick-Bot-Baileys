import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

let msg = `Heiße Mädchen aus Pakistan 🥵🔥`
let endpoint = `https://shizoapi.onrender.com/api/pies/hijab?apikey=${shizokeys}`
const response = await fetch(endpoint);
if (response.ok) {
      const imageBuffer = await response.buffer();
      await conn.sendFile(m.chat, imageBuffer, 'rick.bot.error.png', msg, m, null, rpig);
    } else {
      throw 'Fehler beim Abrufen des Bildes'
    }
}

handler.tags = ['pies', 'sfw']
handler.help = handler.command = ['pakpie']

export default handler
