import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

let msg = `Heiße Mädchen aus Malaysia 🥵🔥`
let endpoint = `https://shizoapi.onrender.com/api/pies/malaysia?apikey=${shizokeys}`
const response = await fetch(endpoint);
if (response.ok) {
      const imageBuffer = await response.buffer();
      await conn.sendFile(m.chat, imageBuffer, 'shizo.techie.error.png', msg, m, null, rpig);
    } else {
      throw bug
    }
}

handler.tags = ['pies', 'sfw']
handler.help = handler.command = ['malpie']

export default handler
