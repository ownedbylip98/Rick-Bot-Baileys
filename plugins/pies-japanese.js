import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

let msg = `Japanisches heißes Mädchen 🥵🔥`
let endpoint = `https://shizoapi.onrender.com/api/pies/japan?apikey=${shizokeys}`
const response = await fetch(endpoint);
if (response.ok) {
      const imageBuffer = await response.buffer();
      await conn.sendFile(m.chat, imageBuffer, 'rick-bot.error.png', msg, m, null, rpig);
    } else {
      throw bug
    }
}

handler.tags = ['pies', 'sfw']
handler.help = handler.command = ['japie']

export default handler
