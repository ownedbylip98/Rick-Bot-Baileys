let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  /*if (global.db.data.users[m.sender].level < 5) {
    return conn.reply(m.chat, 'Du musst mindestens Level 5 sein, um diesen Befehl zu verwenden.', m);
  }*/

  let fa = `🟥 *Gib den Betrag an Gold an, den du setzen möchtest*

*Beispiel:*
${usedPrefix + command} 1000`.trim()
  if (!args[0]) throw fa
  if (isNaN(args[0])) throw fa

  let users = global.db.data.users[m.sender]
  let credit = users.credit
  let amount =
    (args[0] && number(parseInt(args[0]))
      ? Math.max(parseInt(args[0]), 1)
      : /all/i.test(args[0])
        ? Math.floor(parseInt(users.credit))
        : 1) * 1

  let time = users.lastcf + 90000
  if (new Date() - users.lastcf < 90000)
    throw `Du kannst in ${msToTime(time - new Date())} wieder Hahnenkampf spielen`
  if (amount < 100) throw `🟥 *Du kannst nicht weniger als 100 Gold setzen*`
  if (users.credit < amount)
    throw `🟥 *Du hast nicht genug Geld für diese Wette.*\n*Du hast derzeit nur ${credit} Gold.*`
  if (users.chicken < 1) {
    throw `🟥 *Du hast keine Hühner zum Wetten* \nVerwende den Befehl ${usedPrefix}buy-chicken`
  }
  //if (amount > 100000) throw `🟥 *Du kannst nicht mehr als 100000 Gold setzen*`

  let botScore = Math.ceil(Math.random() * 35) * 1 // Zufällige Punktzahl für den Bot (1 bis 35)
  let playerScore = Math.floor(Math.random() * 101) * 1 // Zufällige Punktzahl für den Spieler (1 bis 100)
  let status = `Dein Huhn ist gestorben 🪦`

  if (botScore < playerScore) {
    users.credit += amount * 1
    status = `Dein kleines Huhn hat den Kampf gewonnen und dich um 🪙 ${amount * 2} Gold reicher gemacht! 🐥`
  } else {
    users.credit -= amount * 1
    users.chicken -= 1
    users.lastcf = new Date() * 1
  }

  let result = `${status}
      `.trim()

  m.reply(result)
}

handler.help = ['cock-fight <Betrag>']
handler.tags = ['economy']
handler.command = ['cock-fight', 'cf']

handler.group = true

export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = hours < 10 ? '' + hours : hours
  minutes = minutes < 10 ? '' + minutes : minutes
  seconds = seconds < 10 ? '' + seconds : seconds

  return minutes + ' Minuten ' + seconds + ' Sekunden'
}
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

/**
 * Erkennen, ob das eine Zahl ist
 * @param {Number} x
 * @returns Boolean
 */
function number(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}
