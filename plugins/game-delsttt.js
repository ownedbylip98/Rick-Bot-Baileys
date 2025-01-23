let handler = async (m, { conn, text }) => {
  let room = Object.values(conn.game).find(
    room =>
      room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender)
  )
  if (room == undefined) return conn.reply(m.chat, `✳️ Du bist nicht in einem TicTacToe-Spiel 🎮 `, m)
  delete conn.game[room.id]
  await conn.reply(m.chat, `✅ Die TicTacToe-Sitzung wurde neu gestartet 🎮*`, m)
}
handler.help = ['delttt']
handler.tags = ['game']
handler.command = ['delttc']

export default handler
