let handler = async (m, { conn, args, groupMetadata }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  if (!who) throw `✳️ Markiere oder erwähne jemanden`
  if (!(who in global.db.data.users)) throw `✳️ Der Benutzer ist nicht in meiner Datenbank`
  let warn = global.db.data.users[who].warn
  if (warn > 0) {
    global.db.data.users[who].warn -= 1
    m.reply(`⚠️ *DELWARN*
         
▢ Warnungen: *-1*
▢ Gesamtwarnungen: *${warn - 1}*`)
    m.reply(`✳️ Ein Admin hat deine Warnung reduziert, jetzt hast du *${warn - 1}*`, who)
  } else if (warn == 0) {
    m.reply('✳️ Der Benutzer hat keine Warnungen')
  }
}
handler.help = ['delwarn @user']
handler.tags = ['group']
handler.command = ['delwarn', 'unwarn']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
