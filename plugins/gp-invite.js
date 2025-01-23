let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!text)
    throw `✳️ Gib die Nummer ein, an die du eine Gruppeneinladung senden möchtest\n\n📌 Beispiel :\n*${usedPrefix + command}*923444844060`
  if (text.includes('+')) throw `Gib die Nummer ohne *+* ein`
  if (isNaN(text)) throw ' 📌 Gib nur Zahlen ohne deine Landesvorwahl und ohne Leerzeichen ein'
  let group = m.chat
  let link = 'https://chat.whatsapp.com/' + (await conn.groupInviteCode(group))

  await conn.reply(
    text + '@s.whatsapp.net',
    `≡ *EINLADUNG ZUR GRUPPE*\n\nEin Benutzer hat dich eingeladen, dieser Gruppe beizutreten \n\n${link}`,
    m,
    { mentions: [m.sender] }
  )
  m.reply(`✅ Ein Einladungslink wurde an den Benutzer gesendet`)
}
handler.help = ['invite <923xxx>']
handler.tags = ['group']
handler.command = ['invite', 'invitar']
handler.group = true
handler.admin = false
handler.botAdmin = true

export default handler
