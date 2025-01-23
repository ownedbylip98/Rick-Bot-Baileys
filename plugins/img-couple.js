import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let res = await fetch(global.API('fgmods', '/api/img/couple', {}, 'apikey'))
  let json = await res.json()
  await conn.sendFile(m.chat, json.result.boy, 'img.png', '✅ Junge', m)
  await conn.sendFile(m.chat, json.result.girl, 'img.png', '✅ Mädchen', m)
}
handler.help = ['paar']
handler.tags = ['img']
handler.command = ['paar', 'paar', 'couple'] 
handler.diamond = true

export default handler
