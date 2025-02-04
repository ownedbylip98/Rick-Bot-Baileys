import { toDataURL } from 'qrcode'
let handler = async (m, { text, conn }) => {
  if (!text) throw `*Gib einen Text zum Konvertieren an*`
  conn.sendFile(
    m.chat,
    await toDataURL(text.slice(0, 2048), { scale: 8 }),
    'qrcode.png',
    'Hier bitte',
    m
  )
}
handler.help = ['', 'code'].map(v => 'qr' + v + ' <text>')
handler.tags = ['tools']
handler.command = /^qr(code)?$/i
export default handler
