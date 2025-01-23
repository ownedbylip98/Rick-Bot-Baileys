//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  let user = global.db.data.users[who]
  if (!who) throw `✳️ Markiere oder erwähne jemanden\n\n📌 Beispiel : ${usedPrefix + command} @user`
  if (global.prems.includes(who.split`@`[0])) throw '✳️ Der erwähnte Benutzer ist bereits Premium'
  global.prems.push(`${who.split`@`[0]}`)

  conn.reply(
    m.chat,
    `
✅ PREMIUM

@${who.split`@`[0]} du bist jetzt ein Premium-Benutzer
┌───────────
▢ *Nummer:* ${user.name}
└───────────
`,
    m,
    { mentions: [who] }
  )
}
handler.help = ['addprem <@tag>']
handler.tags = ['owner']
handler.command = ['addprem', 'addpremium']

handler.group = true
handler.rowner = true

export default handler
