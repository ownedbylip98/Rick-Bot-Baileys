let handler = async (m, { conn, text, participants, isAdmin, isOwner, groupMetadata }) => {
  let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
  m.reply(
    `▢ Gruppe : *${groupMetadata.subject}*\n▢ Mitglieder : *${participants.length}*${text ? `\n▢ Nachricht : ${text}\n` : ''}\n┌───⊷ *ERWÄHNUNGEN*\n` +
      users.map(v => '▢ @' + v.replace(/@.+/, '')).join`\n` +
      '\n└──✪ Rick-Bot ┃ ᴮᴼᵀ ✪──',
    null,
    {
      mentions: users,
    }
  )
}

handler.help = ['tagall']
handler.tags = ['group']
handler.command = ['tagall']
handler.admin = true
handler.group = true

export default handler
