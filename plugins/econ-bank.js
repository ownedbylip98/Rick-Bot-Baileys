let handler = async (m, { conn, usedPrefix }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  let user = global.db.data.users[who]
  let username = conn.getName(who)
  //let { wealth } = global.db.data.users[who]
  if (!(who in global.db.data.users)) throw `✳️ Der Benutzer ist nicht in meiner Datenbank gefunden`

  var wealth = 'Pleite😭'
  if (`${user.bank}` <= 3000) {
    wealth = 'Pleite😭'
  } else if (`${user.bank}` <= 6000) {
    wealth = 'Arm😢'
  } else if (`${user.bank}` <= 100000) {
    wealth = 'Durchschnittlich💸'
  } else if (`${user.bank}` <= 1000000) {
    wealth = 'Reich💸💰'
  } else if (`${user.bank}` <= 10000000) {
    wealth = 'Millionär🤑'
  } else if (`${user.bank}` <= 1000000000) {
    wealth = 'Multi-Millionär🤑'
  } else if (`${user.bank}` <= 10000000000) {
    wealth = 'Milliardär🤑🤑'
  }

  conn.reply(
    m.chat,
    `🏦 *Bank | ${username}*

*🪙 Gold* : ${user.bank}

*Reichtum :* ${wealth}

`,
    m,
    { mentions: [who] }
  ) //${user.chicken}
}
handler.help = ['bank']
handler.tags = ['economy']
handler.command = ['bank', 'vault']

export default handler
