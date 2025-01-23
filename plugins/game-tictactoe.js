import TicTacToe from '../lib/tictactoe.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  conn.game = conn.game ? conn.game : {}
  if (
    Object.values(conn.game).find(
      room =>
        room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender)
    )
  )
    throw `✳️ Du bist noch im Spiel. Um die Sitzung neu zu starten, schreibe: *${usedPrefix}delttt*`
  if (!text) throw `✳️ Gib eine Nummer für den Raum an`
  let room = Object.values(conn.game).find(
    room => room.state === 'WAITING' && (text ? room.name === text : true)
  )
  // m.reply('[WIP Feature]')
  if (room) {
    m.reply('✅ Partner gefunden')
    room.o = m.chat
    room.game.playerO = m.sender
    room.state = 'PLAYING'
    let arr = room.game.render().map(v => {
      return {
        X: '❎',
        O: '⭕',
        1: '1️⃣',
        2: '2️⃣',
        3: '3️⃣',
        4: '4️⃣',
        5: '5️⃣',
        6: '6️⃣',
        7: '7️⃣',
        8: '8️⃣',
        9: '9️⃣',
      }[v]
    })
    let str = `
Warte auf @${room.game.currentTurn.split('@')[0]} als erster Spieler
        
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

▢ *Raum ID* ${room.id}

▢ *Regeln*
‣ Mache 3 Reihen von Symbolen vertikal, horizontal oder diagonal, um zu gewinnen ‣ Schreibe *aufgeben*, um das Spiel zu verlassen und als besiegt erklärt zu werden
`.trim()
    if (room.x !== room.o)
      await conn.reply(room.x, str, m, {
        mentions: conn.parseMention(str),
      })
    await conn.reply(room.o, str, m, {
      mentions: conn.parseMention(str),
    })
  } else {
    room = {
      id: 'tictactoe-' + +new Date(),
      x: m.chat,
      o: '',
      game: new TicTacToe(m.sender, 'o'),
      state: 'WAITING',
    }
    if (text) room.name = text

    conn.reply(
      m.chat,
      `⏳ *warte auf einen Partner*\nGib den folgenden Befehl ein, um anzunehmen
▢ *${usedPrefix + command} ${text}*

🎁 Belohnung:  *4999 XP*`,
      m,
      {
        mentions: conn.parseMention(text),
      }
    )

    conn.game[room.id] = room
  }
}

handler.help = ['tictactoe <Raumnummer>']
handler.tags = ['game']
handler.command = ['tictactoe', 'ttc', 'ttt', 'xo']

export default handler
