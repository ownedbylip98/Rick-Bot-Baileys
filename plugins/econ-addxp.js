//import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw '✳️ Markiere den Benutzer'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw '✳️ Gib die Menge an *XP* ein, die du hinzufügen möchtest'
  if (isNaN(txt)) throw ' 🔢 nur Zahlen'
  let xp = parseInt(txt)
  let exp = xp

  if (exp < 1) throw '✳️ Minimum *1*'
  let users = global.db.data.users
  users[who].exp += xp

  await m.reply(`≡ *XP HINZUGEFÜGT*
┌──────────────
▢  *Gesamt:* ${xp}
└──────────────`)
  conn.fakeReply(m.chat, `▢ Hast du erhalten \n\n *+${xp} XP*`, who, m.text)
}

handler.help = ['addxp <@user>']
handler.tags = ['economy']
handler.command = ['addxp']
handler.rowner = true

export default handler
