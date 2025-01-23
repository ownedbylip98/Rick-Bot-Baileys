//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let poin = 300
  let reseqv = `✳️ Wähle Stein/Papier/Schere\n\nBeispiel : *${usedPrefix + command}* Papier\n`
  if (!text) throw reseqv
  var astro = Math.random()

  if (astro < 0.34) {
    astro = 'Stein'
  } else if (astro > 0.34 && astro < 0.67) {
    astro = 'Schere'
  } else {
    astro = 'Papier'
  }

  if (text == astro) {
    global.db.data.users[m.sender].exp += 100
    m.reply(`▢ *Unentschieden*\n\n‣ Du : ${text}\n‣ Guru : ${astro}\n\n🎁 Punkte (±)100 XP`)
  } else if (text == 'Stein') {
    if (astro == 'Schere') {
      global.db.data.users[m.sender].exp += 300
      m.reply(`▢ *Gewonnen* 🎊\n\n‣ Du : ${text}\n‣ Guru : ${astro}\n\n🎁 Punkte *+${poin} XP*`)
    } else {
      global.db.data.users[m.sender].exp -= 300
      m.reply(`▢ *Verloren*\n\n‣ Du : ${text}\n‣ Guru : ${astro}\n\n Punkte *-${poin} XP*`)
    }
  } else if (text == 'Schere') {
    if (astro == 'Papier') {
      global.db.data.users[m.sender].exp += 300
      m.reply(`▢ *Gewonnen* 🎊\n\n‣ Du : ${text}\n‣ Guru : ${astro}\n\n🎁 Punkte *+${poin} XP*`)
    } else {
      global.db.data.users[m.sender].exp -= 300
      m.reply(`▢ *Verloren*\n\n‣ Du : ${text}\n‣ Guru : ${astro}\n\nPunkte *-${poin} XP*`)
    }
  } else if (text == 'Papier') {
    if (astro == 'Stein') {
      global.db.data.users[m.sender].exp += 300
      m.reply(`▢ *Gewonnen* 🎊\n\n‣ Du : ${text}\n‣ Guru : ${astro}\n\n🎁 Punkte *+${poin} XP*`)
    } else {
      global.db.data.users[m.sender].exp -= 300
      m.reply(`▢ *Verloren*\n\n‣ Du : ${text}\n‣ Guru : ${astro}\n\nPunkte *-${poin} XP*`)
    }
  } else {
    throw reseqv
  }
}
handler.help = ['ppt <Stein/Papier/Schere>']
handler.tags = ['game']
handler.command = ['ppt']
handler.register = false

export default handler
