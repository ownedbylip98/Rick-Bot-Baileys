import { Chess } from 'chess.js'

const handler = async (m, { conn, args }) => {
  const key = m.chat
  conn.chess = conn.chess || {}
  let chessData = conn.chess[key] || {
    gameData: null,
    fen: null,
    currentTurn: null,
    players: [],
    hasJoined: [],
  }
  conn.chess[key] = chessData
  const { gameData, fen, currentTurn, players, hasJoined } = chessData
  const feature = args[0]?.toLowerCase()

  if (feature === 'delete') {
    delete conn.chess[key]
    return conn.reply(m.chat, '🏳️ *Schachspiel gestoppt.*', m)
  }

  if (feature === 'create') {
    if (gameData) {
      return conn.reply(m.chat, '⚠️ *Spiel läuft bereits.*', m)
    }
    chessData.gameData = { status: 'waiting', black: null, white: null }
    return conn.reply(m.chat, '🎮 *Schachspiel gestartet.*\nWarte auf andere Spieler, um beizutreten.', m)
  }

  if (feature === 'join') {
    const senderId = m.sender
    if (players.includes(senderId)) {
      return conn.reply(m.chat, '🙅‍♂️ *Du hast bereits an diesem Spiel teilgenommen.*', m)
    }
    if (!gameData || gameData.status !== 'waiting') {
      return conn.reply(m.chat, '⚠️ *Kein Schachspiel wartet derzeit auf Spieler.*', m)
    }
    if (players.length >= 2) {
      return conn.reply(
        m.chat,
        '👥 *Spieler sind bereits genug.*\nDas Spiel wird automatisch gestartet.',
        m
      )
    }
    players.push(senderId)
    hasJoined.push(senderId)
    if (players.length === 2) {
      gameData.status = 'ready'
      const [black, white] =
        Math.random() < 0.5 ? [players[1], players[0]] : [players[0], players[1]]
      gameData.black = black
      gameData.white = white
      chessData.currentTurn = white
      return conn.reply(
        m.chat,
        `🙌 *Spieler, die beigetreten sind:*\n${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}\n\n*Schwarz:* @${black.split('@')[0]}\n*Weiß:* @${white.split('@')[0]}\n\nBitte benutze *'chess start'*, um das Spiel zu beginnen.`,
        m,
        { mentions: hasJoined }
      )
    } else {
      return conn.reply(
        m.chat,
        '🙋‍♂️ *Du hast dem Schachspiel beigetreten.*\nWarte auf andere Spieler, um beizutreten.',
        m
      )
    }
  }

  if (feature === 'start') {
    if (gameData.status !== 'ready') {
      return conn.reply(m.chat, '⚠️ *Kann das Spiel nicht starten. Warte, bis zwei Spieler beigetreten sind.*', m)
    }
    gameData.status = 'playing'
    const senderId = m.sender
    if (players.length === 2) {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
      chessData.fen = fen
      const encodedFen = encodeURIComponent(fen)
      const turn = `🎲 *Zug:* Weiß @${gameData.white.split('@')[0]}`
      const flipParam = senderId === gameData.black ? '' : '&flip=true'
      const flipParam2 = senderId === gameData.black ? '' : '-flip'
      const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`
      try {
        await conn.sendFile(m.chat, boardUrl, '', turn, m, false, { mentions: [gameData.white] })
      } catch (error) {
        const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`
        await conn.sendFile(m.chat, boardUrl2, '', turn, m, false, { mentions: [gameData.black] })
      }
      return
    } else {
      return conn.reply(
        m.chat,
        '🙋‍♂️ *Du hast dem Schachspiel beigetreten.*\nWarte auf andere Spieler, um beizutreten.',
        m
      )
    }
  }

  if (args[0] && args[1]) {
    const senderId = m.sender
    if (!gameData || gameData.status !== 'playing') {
      return conn.reply(m.chat, '⚠️ *Das Spiel hat noch nicht begonnen.*', m)
    }
    if (currentTurn !== senderId) {
      return conn.reply(
        m.chat,
        `⏳ *Es ist derzeit ${chessData.currentTurn === gameData.white ? 'Weiß' : 'Schwarz'}'s Zug.*`,
        m,
        {
          contextInfo: {
            mentionedJid: [currentTurn],
          },
        }
      )
    }
    const chess = new Chess(fen)
    if (chess.isCheckmate()) {
      delete conn.chess[key]
      return conn.reply(
        m.chat,
        `⚠️ *Schachmatt.*\n🏳️ *Schachspiel gestoppt.*\n*Gewinner:* @${m.sender.split('@')[0]}`,
        m,
        {
          contextInfo: {
            mentionedJid: [m.sender],
          },
        }
      )
    }
    if (chess.isDraw()) {
      delete conn.chess[key]
      return conn.reply(
        m.chat,
        `⚠️ *Unentschieden.*\n🏳️ *Schachspiel gestoppt.*\n*Spieler:* ${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}`,
        m,
        {
          contextInfo: {
            mentionedJid: hasJoined,
          },
        }
      )
    }
    const [from, to] = args
    try {
      chess.move({ from, to, promotion: 'q' })
    } catch (e) {
      return conn.reply(m.chat, '❌ *Ungültiger Zug.*', m)
    }
    chessData.fen = chess.fen()
    const currentTurnIndex = players.indexOf(currentTurn)
    const nextTurnIndex = (currentTurnIndex + 1) % 2
    chessData.currentTurn = players[nextTurnIndex]
    const encodedFen = encodeURIComponent(chess.fen())
    const currentColor = chessData.currentTurn === gameData.white ? 'Weiß' : 'Schwarz'
    const turn = `🎲 *Zug:* ${currentColor} @${chessData.currentTurn.split('@')[0]}\n\n${chess.getComment() || ''}`
    const flipParam = senderId === gameData.black ? '' : '&flip=true'
    const flipParam2 = senderId === gameData.black ? '' : '-flip'
    const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`
    try {
      await conn.sendFile(m.chat, boardUrl, '', turn, m, false, {
        mentions: [chessData.currentTurn],
      })
    } catch (error) {
      const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`
      await conn.sendFile(m.chat, boardUrl2, '', turn, m, false, {
        mentions: [chessData.currentTurn],
      })
    }
    chess.deleteComment()
    return
  }

  if (feature === 'help') {
    return conn.reply(
      m.chat,
      `
      🌟 *Schachspiel Befehle:*

*chess create* - Starte ein Schachspiel
*chess join* - Trete einem wartenden Schachspiel bei
*chess start* - Starte das Schachspiel, wenn zwei Spieler beigetreten sind
*chess delete* - Stoppe das Schachspiel
*chess [from] [to]* - Mache einen Zug im Schachspiel

*Beispiel:*
Tippe *chess create*, um ein Schachspiel zu starten.
Tippe *chess join*, um einem wartenden Schachspiel beizutreten.
    `,
      m
    )
  }
  return conn.reply(
    m.chat,
    '❓ Ungültiger Befehl. Benutze *"chess help"*, um die verfügbaren Befehle zu sehen.',
    m
  )
}

handler.help = ['chess [from to]', 'chess delete', 'chess join', 'chess start']
handler.tags = ['game']
handler.command = /^(chess|chatur)$/i

export default handler
