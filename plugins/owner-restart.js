import { spawn } from 'child_process'
let handler = async (m, { conn, isROwner, text }) => {
  if (!process.send) throw 'Nicht: node main.js\nSondern: node index.js'
  if (conn.user.jid == conn.user.jid) {
    await m.reply('🔄 Bot wird neu gestartet...\n Einen Moment bitte')
    process.send('reset')
  } else throw 'eh'
}

handler.help = ['neustart']
handler.tags = ['eigentümer']
handler.command = ['neustart']

handler.rowner = true

export default handler
