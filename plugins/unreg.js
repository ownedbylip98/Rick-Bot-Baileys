//import db from '../lib/database.js'

import { createHash } from 'crypto'
let handler = async function (m, { conn, args, usedPrefix }) {
  if (!args[0])
    throw `✳️ *Gib die Seriennummer ein*\nÜberprüfe deine Seriennummer mit dem Befehl...\n\n*${usedPrefix}nserie*`
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw '⚠️ *Falsche Seriennummer*'
  user.registered = false
  m.reply(`✅ Registrierung gelöscht`)
}
handler.help = ['unreg <Num Serie>']
handler.tags = ['rg']

handler.command = ['unreg']
handler.register = true

export default handler
