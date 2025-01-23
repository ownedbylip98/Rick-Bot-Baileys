//import db from '../lib/database.js'

export function before(m) {
  let user = global.db.data.users[m.sender]
  if (user.afk > -1) {
    m.reply(
      `
  ✅ Du bist nicht mehr AFK 
${user.afkReason ? ' \n▢ *Grund :* ' + user.afkReason : ''}
▢ *AFK Dauer :* ${(new Date() - user.afk).toTimeString()}
  `.trim()
    )
    user.afk = -1
    user.afkReason = ''
  }
  let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (let jid of jids) {
    let user = global.db.data.users[jid]
    if (!user) continue
    let afkTime = user.afk
    if (!afkTime || afkTime < 0) continue
    let reason = user.afkReason || ''
    m.reply(
      `
💤 Die Person, die du erwähnt hast, ist AFK 

${reason ? '▢ *Grund* : ' + reason : '▢ *Grund* : Ohne Grund'}
▢ *AFK Dauer :* ${(new Date() - afkTime).toTimeString()}
  `.trim()
    )
  }
  return true
}
