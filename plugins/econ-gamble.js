let rouletteBets = {} // Object to store all the bets
let rouletteResult = {} // Object to store the result

const handler = async (m, { conn, args, usedPrefix, command }) => {
  /*if (global.db.data.users[m.sender].level < 5) {
        return conn.reply(m.chat, 'You must be at least level 5 to use this command.', m);
    }*/

  const resolveRoulette = (chatId, conn) => {
    let who = m.quoted
      ? m.quoted.sender
      : m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
          ? conn.user.jid
          : m.sender
    let username = conn.getName(who)
    if (!(who in global.db.data.users)) throw `✳️ Der Benutzer wurde nicht in meiner Datenbank gefunden`

    if (rouletteBets[chatId] && rouletteBets[chatId].length > 0) {
      let colores = ['red', 'black']
      let colour = colores[Math.floor(Math.random() * colores.length)]

      let winners = []
      let resultMessage = `Die Kugel landete auf ${colour}\n\n🎉 Gewinner 🎉\n\n`

      for (let bet of rouletteBets[chatId]) {
        let result = ''
        if (colour === bet.color) {
          result = `@${bet.user.split('@')[0]} hat ${bet.amount} gewonnen`
          global.db.data.users[bet.user].credit += bet.amount
          winners.push(result)
        } else {
          result = `@${bet.user.split('@')[0]} hat ${bet.amount} verloren`
          global.db.data.users[bet.user].credit -= bet.amount
        }
      }

      resultMessage += winners.join('\n')
      if (winners.length === 0) {
        resultMessage += 'Keine Gewinner'
      }

      rouletteResult[chatId] = resultMessage
      delete rouletteBets[chatId]

      //conn.sendFile(m.chat, pp, 'gamble.jpg', resultMessage, m, false, { mentions: [who] })
      conn.reply(m.chat, resultMessage, m, { mentions: [who] })
      //m.reply(resultMessage)
    }
  }

  const runRoulette = (chatId, conn) => {
    const delay = 10 * 1000 // 30 seconds

    setTimeout(() => {
      resolveRoulette(chatId, conn)
    }, delay)
  }

  const betRoulette = (user, chatId, amount, color) => {
    let colores = ['red', 'black']
    if (isNaN(amount) || amount < 500) {
      throw `✳️ Der Mindesteinsatz beträgt 500 Gold`
    }
    if (!colores.includes(color)) {
      throw '✳️ Du musst eine gültige Farbe angeben: rot oder schwarz'
    }
    if (users.credit < amount) {
      throw '✳️ Du hast nicht genug Gold!'
    }
    if (amount > 100000) {
      throw `🟥 Du kannst nicht mehr als 100000 Gold setzen`
    }

    if (!rouletteBets[chatId]) {
      rouletteBets[chatId] = []
    }
    rouletteBets[chatId].push({ user, amount, color })
    return `✅ Dein Einsatz von ${amount} Gold auf ${color} wurde platziert!`
  }

  //const handler = async (m, { conn, args, usedPrefix, command }) => {
  let amount = parseInt(args[0])
  let color = args[1]?.toLowerCase()
  if (args.length < 2) {
    throw `✳️ Befehlssyntax: ${usedPrefix + command} <Betrag> <Farbe>\n\n Beispiel: ${usedPrefix + command} 500 rot`
  }

  let users = global.db.data.users[m.sender]
  let response = betRoulette(m.sender, m.chat, amount, color)

  m.reply(response)
  runRoulette(m.chat, conn)
}

handler.help = ['gamble <Betrag> <Farbe(rot/schwarz)>']
handler.tags = ['economy']
handler.command = ['gamble']

handler.group = true

export default handler
