let handler = async (m, { conn, text }) => {
  if (!text) throw 'Kein Text'
  conn.sendFile(
    m.chat,
    global.API('https://some-random-api.com', '/canvas/misc/youtube-comment', {
      avatar: await conn
        .profilePictureUrl(m.sender, 'image')
        .catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
      comment: text,
      username: conn.getName(m.sender),
    }),
    'error.png',
    '*DANKE FÜR DEINEN KOMMENTAR*',
    m
  )
}
handler.help = ['ytcomment <kommentar>']
handler.tags = ['macher']
handler.command = /^(ytcomment)$/i
export default handler
