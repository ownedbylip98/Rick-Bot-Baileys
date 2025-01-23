let handler = async (m, { conn, usedPrefix }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  let user = global.db.data.users[who]

  let username = conn.getName(who)
  if (!(who in global.db.data.users)) throw `🟨 Der Benutzer ist nicht in meiner Datenbank gefunden`
  conn.reply(
    m.chat,
    `👛 *Geldbörse | ${username}*
     🪙 *Gold* : ${user.credit}
`,
    m,
    { mentions: [who] }
  )
}
handler.help = ['geldbörse']
handler.tags = ['wirtschaft']
handler.command = ['geldbörse', 'gold']

export default handler
