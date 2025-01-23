let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw '✳️ Markiere den Benutzer'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw '✳️ Gib die Menge an *Gold* ein, die du hinzufügen möchtest'
  if (isNaN(txt)) throw '🔢 nur Zahlen'
  let dmt = parseInt(txt)
  let diamond = dmt

  if (diamond < 1) throw '✳️ Minimum *1*'
  let users = global.db.data.users
  users[who].credit += dmt

  await m.reply(`≡ *Gold HINZUGEFÜGT*
┌──────────────
▢ *Gesamt:* ${dmt}
└──────────────`)
  conn.fakeReply(m.chat, `▢ Hast du erhalten \n\n *+${dmt}* Gold`, who, m.text)
}

handler.help = ['addgold <@user>']
handler.tags = ['economy']
handler.command = ['addgold']
handler.rowner = true

export default handler
