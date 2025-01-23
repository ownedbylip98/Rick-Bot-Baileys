let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let amount = parseInt(args[0])
  let color = args[1]?.toLowerCase()
  if (args.length < 2)
    throw `✳️ Befehl Verwendung: ${usedPrefix + command} <Betrag> <Farbe>\n\n Beispiel: ${usedPrefix + command} 500 rot`
  let colores = ['red', 'black']
  let colour = colores[Math.floor(Math.random() * colores.length)]
  let user = global.db.data.users[m.sender]
  if (isNaN(amount) || amount < 500) throw `✳️ Der Mindesteinsatz beträgt 500 Gold`
  if (!colores.includes(color)) throw '✳️ Du musst eine gültige Farbe angeben: rot oder schwarz'
  if (user.credit < amount) throw '✳️ Du hast nicht genug Gold!'
  if (amount > 100000) throw `🟥 *Du kannst nicht mehr als 100000 Gold setzen*`
  let result = ''
  if (colour == color) {
    result = `${colour == 'red' ? 'Die Kugel landete auf 🔴' : 'Die Kugel landete auf ⚫'} \n\nDu hast ${amount * 2} Gold gewonnen`
    user.credit += amount * 2
  } else {
    result = `${colour == 'red' ? 'Die Kugel landete auf 🔴' : 'Die Kugel landete auf ⚫'} \n\nDu hast ${amount} Gold verloren`
    user.credit -= amount
  }
  m.reply(result)
}
handler.help = ['roulette <Betrag> <Farbe(rot/schwarz)>']
handler.tags = ['economy']
handler.command = ['roulette', 'rt']

handler.group = true

export default handler
