import { toPTT } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (!/video|audio/.test(mime))
    throw `✳️ Antworte auf das Audio, das du in eine Sprachnachricht umwandeln möchtest, mit:\n *${usedPrefix + command}*`
  let media = await q.download?.()
  if (!media) throw '❌ Fehler beim Herunterladen der Medien'
  let audio = await toPTT(media, 'mp4')
  if (!audio.data) throw '❌ Fehler bei der Umwandlung'
  conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true, { mimetype: 'audio/mp4' })
}
handler.help = ['toav']
handler.tags = ['fun']

handler.command = ['toav', 'tovn']

export default handler
