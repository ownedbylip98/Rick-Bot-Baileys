let handler = async (m, { conn, text, command }) => {
  try {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    else who = m.quoted.sender ? m.quoted.sender : m.sender
    let bio = await conn.fetchStatus(who)
    m.reply(bio.status)
  } catch {
    if (text) throw `Bio ist privat!`
    else
      try {
        let who = m.quoted ? m.quoted.sender : m.sender
        let bio = await conn.fetchStatus(who)
        m.reply(bio.status)
      } catch {
        throw `Bio ist privat!`
      }
  }
}
handler.help = ['getbio <@tag/antworten>']
handler.tags = ['gruppe']
handler.command = /^(getb?io)$/i
handler.limit = true
export default handler
