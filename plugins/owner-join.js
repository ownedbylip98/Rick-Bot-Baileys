let handler = async (m, { conn, text, usedPrefix, command, args, participants, isOwner }) => {
  if (!isOwner)
    return conn.sendMessage(
      m.chat,
      {
        text: `*Lade den Bot in eine Gruppe ein*\n\nHallo @${m.sender.split('@')[0]}\ndu kannst den Bot mieten, um einer Gruppe beizutreten\n\n_Für mehr Infos kannst du den Besitzer kontaktieren_\n*Gib* \`\`\`.owner\`\`\` *ein, um den Besitzer zu kontaktieren*`.trim(),
      },
      { quoted: m }
    )

  let time = global.db.data.users[m.sender].lastjoin + 86400000
  let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
  let delay = time => new Promise(res => setTimeout(res, time))

  let name = m.sender
  let [_, code] = text.match(linkRegex) || []
  if (!args[0])
    throw `✳️ Sende den Gruppenlink\n\n 📌 Beispiel:\n *${usedPrefix + command}* <linkwa> <tage>\n\n_die Zahl steht für die Tage, die der Bot in der Gruppe bleibt_`
  if (!code) throw `✳️ Ungültiger Link`
  if (!args[1])
    throw `📌 Anzahl der Tage fehlt\n\n Beispiel:\n *${usedPrefix + command}* <linkwa> 2`
  if (isNaN(args[1])) throw `✳️ Nur Zahlen, die die Tage darstellen, die der Bot in der Gruppe bleibt!`
  let owbot = global.owner[1]
  m.reply(`😎 Warte 3 Sekunden, ich werde der Gruppe beitreten`)
  await delay(3000)
  try {
    let res = await conn.groupAcceptInvite(code)
    let b = await conn.groupMetadata(res)
    let d = b.participants.map(v => v.id)
    let member = d.toString()
    let e = await d.filter(v => v.endsWith(owbot + '@s.whatsapp.net'))
    let nDays = 86400000 * args[1]
    let now = new Date() * 1
    if (now < global.db.data.chats[res].expired) global.db.data.chats[res].expired += nDays
    else global.db.data.chats[res].expired = now + nDays
    if (e.length)
      await m.reply(
        `✅ Ich bin erfolgreich der Gruppe beigetreten \n\n≡ Gruppeninfo \n\n *Name :* ${await conn.getName(res)}\n\nDer Bot wird automatisch nach \n\n${msToDate(global.db.data.chats[res].expired - now)} austreten`
      )

    if (e.length)
      await conn
        .reply(
          res,
          `🏮 Hallo Leute

@${owbot} ist mein Ersteller, wenn du Fragen hast
Ich wurde von *${m.name}* eingeladen`,
          m,
          {
            mentions: d,
          }
        )
        .then(async () => {
          await delay(7000)
        })
        .then(async () => {
          await conn.reply(res, `ok, alle entspannen 🤭`, 0)
          await conn.reply(
            global.owner[1] + '@s.whatsapp.net',
            `≡ *GRUPPENEINLADUNG*\n\n@${m.sender.split('@')[0]} hat *${conn.user.name}* zur Gruppe eingeladen\n\n*${await conn.getName(res)}*\n\n*ID* : ${res}\n\n📌 Link : ${args[0]}\n\nDer Bot wird automatisch nach \n\n${msToDate(global.db.data.chats[res].expired - now)} austreten`,
            null,
            { mentions: [m.sender] }
          )
        })
    if (!e.length)
      await conn.reply(
        global.owner[1] + '@s.whatsapp.net',
        `≡ *GRUPPENEINLADUNG*\n\n@${m.sender.split('@')[0]} hat *${conn.user.name}* zur Gruppe eingeladen\n\n*${await conn.getName(res)}*\n\n*ID* : ${res}\n\n📌 Link : ${args[0]}\n\nDer Bot wird automatisch nach \n\n${msToDate(global.db.data.chats[res].expired - now)} austreten`,
        null,
        { mentions: [m.sender] }
      )
    if (!e.length)
      await m
        .reply(
          `✳️ Erfolgreich den Bot zur Gruppe eingeladen\n\n${await conn.getName(res)}\n\nDer Bot wird automatisch nach *${msToDate(global.db.data.chats[res].expired - now)}* austreten`
        )
        .then(async () => {
          let mes = `Hallo 👋🏻
     
*${conn.user.name}* ist einer der Multi-Device WhatsApp Bots, gebaut mit Node.js, *${conn.user.name}* wurde gerade von *${m.name}* eingeladen

um das Menü des Bots zu sehen, schreibe

${usedPrefix}help
@${conn.user.jid.split('@')[0]} wird automatisch nach \n\n${msToDate(global.db.data.chats[res].expired - now)} austreten`
          await conn.sendMessage(m.chat, mes, m, {
            mentions: d,
          })
        })
  } catch (e) {
    conn.reply(global.owner[1] + '@s.whatsapp.net', e)
    throw `✳️ Sorry, der Bot konnte der Gruppe nicht beitreten`
  }
}
handler.help = ['join <chat.whatsapp.com> <tage>']
handler.tags = ['owner']
handler.command = ['join', 'invite']

export default handler

function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *Tage*\n ', h, ' *Stunden*\n ', m, ' *Minuten*\n ', s, ' *Sekunden* ']
    .map(v => v.toString().padStart(2, 0))
    .join('')
}
