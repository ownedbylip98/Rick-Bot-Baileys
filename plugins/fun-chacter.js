let handler = async (m, { conn, command, text, usedPrefix, participants }) => {
  if (!text) throw 'Erwähne, wessen Charakter du überprüfen möchtest'
  const mentionedUser =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : args[2]
        ? args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net'
        : ''
  const userChar = [
    'Sigma',
    'Großzügig',
    'Mürrisch',
    'Überheblich',
    'Gehorsam',
    'Gut',
    'Simp',
    'Freundlich',
    'Geduldig',
    'Pervers',
    'Cool',
    'Hilfsbereit',
    'Brillant',
    'Sexy',
    'Heiß',
    'Wunderschön',
    'Niedlich',
  ]
  const userCharacterSeletion = userChar[Math.floor(Math.random() * userChar.length)]

  let message = `Der Charakter von @${mentionedUser.split('@')[0]} ist *${userCharacterSeletion}* 🔥⚡`

  conn.sendMessage(m.chat, { text: message, mentions: [mentionedUser] }, { quoted: m })
}
handler.help = ['character @tag']
handler.tags = ['fun']
handler.command = /^(character)/i

export default handler
