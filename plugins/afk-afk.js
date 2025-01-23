//import db from '../lib/database.js'

let handler = async (m, { text, conn }) => {
  let user = global.db.data.users[m.sender]
  user.afk = +new Date()
  user.afkReason = text
  m.reply(`
  😴 *AFK* 
Du bist jetzt AFK, bis du eine Nachricht sendest 
▢ *Benutzer:* ${conn.getName(m.sender)} 
▢ *Grund:* ${text ? text : ''}
  `)
}
handler.help = ['afk <reason>']
handler.tags = ['fun']
handler.command = ['afk']
handler.group = true

export default handler
