//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  let user = global.db.data.users[who]
  if (!who) throw `✳️ Markiere oder erwähne den Benutzer, um ihn zu entbannen`
  let users = global.db.data.users
  users[who].banned = false
  conn.reply(
    m.chat,
    `
✅ ENTBANNT

───────────
@${who.split`@`[0]} wurde entbannt`,
    m,
    { mentions: [who] }
  )
}
handler.help = ['entbanne @user']
handler.tags = ['owner']
handler.command = /^entbanne$/i
handler.rowner = true

export default handler
