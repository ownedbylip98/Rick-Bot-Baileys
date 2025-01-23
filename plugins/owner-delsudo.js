let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
  } else {
    who = m.chat
  }
  if (!who) throw 'Markiere die Person, die du als Besitzer entfernen möchtest!'

  const ownerId = who.split('@')[0]
  const ownerIndex = global.owner.findIndex(owner => owner[0] === ownerId)

  if (ownerIndex === -1) throw 'Diese Person ist kein Besitzer!'

  const removedOwner = global.owner.splice(ownerIndex, 1)[0]
  const caption = `@${removedOwner[0]} wurde als Besitzer entfernt.`

  await conn.reply(m.chat, caption, m, {
    mentions: conn.parseMention(caption),
  })
}

handler.help = ['removeowner @user']
handler.tags = ['owner']
handler.command = /^(remove|del|-)(owner|sudo)$/i
handler.owner = true

export default handler
