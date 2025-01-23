let reg = 40
let handler = async (m, { conn, args, usedPrefix, command }) => {
  /* if (global.db.data.users[m.sender].level < 5) {
        return conn.reply(m.chat, 'Du musst mindestens Level 5 sein, um diesen Befehl zu verwenden.', m);
    }*/

  let fa = `🟥 *Gib den Betrag an Gold an, den du setzen möchtest*

*Beispiel :
${usedPrefix + command} 500*`.trim()
  if (!args[0]) throw fa
  if (isNaN(args[0])) throw fa
  let amount = parseInt(args[0])
  m.react('🎰')
  let users = global.db.data.users[m.sender]
  let time = users.lastslot + 10000
  if (new Date() - users.lastslot < 10000)
    throw `⏳ Warte *${msToTime(time - new Date())}* bevor du es erneut verwendest`
  if (amount < 500) throw `🟥 *Du kannst nicht weniger als 500 Gold setzen*`
  if (users.credit < amount) {
    throw `🟥 *Du hast nicht genug Gold zum Setzen*`
  }
  if (amount > 100000) throw `🟥 *Du kannst nicht mehr als 100000 Gold setzen*`

  let emojis = ['🕊️', '🦀', '🦎']
  let a = Math.floor(Math.random() * emojis.length)
  let b = Math.floor(Math.random() * emojis.length)
  let c = Math.floor(Math.random() * emojis.length)
  let x = [],
    y = [],
    z = []
  for (let i = 0; i < 3; i++) {
    x[i] = emojis[a]
    a++
    if (a == emojis.length) a = 0
  }
  for (let i = 0; i < 3; i++) {
    y[i] = emojis[b]
    b++
    if (b == emojis.length) b = 0
  }
  for (let i = 0; i < 3; i++) {
    z[i] = emojis[c]
    c++
    if (c == emojis.length) c = 0
  }
  let end
  if (a == b && b == c) {
    end = `🎊 *Jackpot!* Du hast ${amount + amount} Gold gewonnen`
    users.credit += amount + amount
    // } else if (a == b || a == c || b == c) {
    //     end = `Du hast *₹${amount}* verloren\n*Aber du warst fast da, versuche es weiter*`
    //     users.credit -= amount
  } else {
    end = `      Du hast ${amount} Gold verloren`
    users.credit -= amount
  }
  users.lastslot = new Date() * 1
  return await m.reply(
    `
     🎰 ┃ *SLOTS* ┃ 🎰
     ───────────
         ${x[0]} : ${y[0]} : ${z[0]}
         ${x[1]} : ${y[1]} : ${z[1]}
         ${x[2]} : ${y[2]} : ${z[2]}
     ───────────     
${end}`
  )
}
handler.help = ['slot <Betrag>']
handler.tags = ['game']
handler.command = ['slot']

handler.group = true

export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return seconds + ' Sekunden'
}
