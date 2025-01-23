let handler = async (m, { conn, command, args, usedPrefix }) => {
  let user = global.db.data.users[m.sender]

  if (user.chicken > 0) return m.reply('Du hast das bereits')
  if (user.credit < 500)
    return m.reply(`🟥 *Du hast nicht genügend Gold in deinem Portemonnaie, um ein Huhn zu kaufen*`)

  user.credit -= 1000
  user.chicken += 1
  m.reply(
    `🎉 Du hast erfolgreich ein Huhn gekauft, um zu kämpfen! Verwende den Befehl ${usedPrefix}cock-fight <Betrag>`
  )
}

handler.help = ['buych']
handler.tags = ['economy']
handler.command = ['buy-chicken', 'buych']

handler.group = true

export default handler
