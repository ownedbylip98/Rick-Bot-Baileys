let handler = async (m, { conn, args, text }) => {
  if (!text) throw `*GIB DEN NAMEN EIN, DEN DU ALS NEUEN GRUPPENNAMEN HABEN MÖCHTEST*`
  try {
    let text = args.join` `
    if (!args || !args[0]) {
    } else {
      conn.groupUpdateSubject(m.chat, text)
      m.reply(`*✅ ERFOLGREICH GEÄNDERT IN ${text}*`)
    }
  } catch (e) {
    throw '*ENTSCHULDIGUNG, ES GAB EINEN FEHLER, DER NAME DARF NICHT MEHR ALS 25 ZEICHEN HABEN*'
  }
}
handler.help = ['setname <text>']
handler.tags = ['group']
handler.command = /^(setname)$/i
handler.group = true
handler.admin = true
export default handler
