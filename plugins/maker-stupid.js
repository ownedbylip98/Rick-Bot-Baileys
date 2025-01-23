let handler = async (m, { conn, args }) => {
  let text = args.slice(1).join(' ')
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  conn.sendFile(
    m.chat,
    global.API('https://some-random-api.com', '/canvas/misc/its-so-stupid', {
      avatar: await conn
        .profilePictureUrl(who, 'image')
        .catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
      dog: text || 'ich+bin+dumm',
    }),
    'error.png',
    `*@${author}*`,
    m
  )
}
handler.help = ['esistsoodumm', 'eisd', 'dumm']
handler.tags = ['macher']
handler.command = /^(esistsoodumm|eisd|dumm)$/i
export default handler
