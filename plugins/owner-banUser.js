//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  let user = global.db.data.users[who]
  if (!who) throw `✳️ Markiere oder erwähne jemanden\n\n📌 Beispiel: ${usedPrefix + command} @user`
  let users = global.db.data.users
  users[who].banned = true
  conn.reply(
    m.chat,
    `
✅ GEBANNT

───────────
@${who.split`@`[0]} du kannst meine Befehle nicht mehr verwenden `,
    m,
    { mentions: [who] }
  )
}
handler.help = ['ban @user']
handler.tags = ['owner']
handler.command = /^ban$/i
handler.rowner = true

export default handler
