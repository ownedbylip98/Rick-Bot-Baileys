const xppercredit = 350
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^buy/i, '')
  count = count
    ? /all/i.test(count)
      ? Math.floor(global.db.data.users[m.sender].exp / xppercredit)
      : parseInt(count)
    : args[0]
      ? parseInt(args[0])
      : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].exp >= xppercredit * count) {
    global.db.data.users[m.sender].exp -= xppercredit * count
    global.db.data.users[m.sender].credit += count
    conn.reply(
      m.chat,
      `
┌─「 *ZAHLUNGSBESTÄTIGUNG* 」
‣ *Gekaufte Menge* : + ${count} 
‣ *Ausgegeben* : -${xppercredit * count} XP
└──────────────`,
      m
    )
  } else
    conn.reply(
      m.chat,
      `❎ Entschuldigung, du hast nicht genug *XP*, um *${count}* Gold zu kaufen\n\n Du kannst *XP* mit den Befehlen aus dem *Spiele- und Wirtschaftsmenü* erhalten`,
      m
    )
}
handler.help = ['kaufen', 'kaufenalle']
handler.tags = ['wirtschaft']
handler.command = ['kaufen', 'kaufenalle']

handler.disabled = false

export default handler
