import fetch from 'node-fetch'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

import fs from 'fs'
import os from 'os'
import path from 'path'

let handler = async (m, { conn, text }) => {
  try {
    // Check if no text and no quoted message
    if (!text && !(m.quoted && m.quoted.text)) {
      // Reply in WhatsApp, not just logging in the terminal
      return m.reply("Bitte gib einen Text ein oder zitiere eine Nachricht, um eine Antwort zu erhalten.")
    }

    if (!text && m.quoted && m.quoted.text) {
      text = m.quoted.text
    }

    let who = m.quoted
      ? m.quoted.sender
      : m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
          ? conn.user.jid
          : m.sender
    if (!(who in global.db.data.users)) throw '✳️ Der Benutzer ist nicht in meiner Datenbank gefunden'
    
    let userPfp = await conn
      .profilePictureUrl(who, 'image')
      .catch(_ => 'https://i.ibb.co/9HY4wjz/a4c0b1af253197d4837ff6760d5b81c0.jpg')
    let user = global.db.data.users[who]
    let { name } = global.db.data.users[who]

    m.react(rwait)

    let quoteJson = {
      type: 'quote',
      format: 'png',
      backgroundColor: '#FFFFFF',
      width: 1800,
      height: 200, // Adjust the height value as desired
      scale: 2,
      messages: [
        {
          entities: [],
          avatar: true,
          from: {
            id: 1,
            name: name,
            photo: {
              url: userPfp,
            },
          },
          text: text,
          replyMessage: {},
        },
      ],
    }

    let res = await fetch('https://bot.lyo.su/quote/generate', {
      method: 'POST',
      body: JSON.stringify(quoteJson),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      throw new Error(`Fehler beim Abrufen: ${res.status} ${res.statusText}`)
    }

    let json = await res.json()

    if (!json.result || !json.result.image) {
      throw new Error('Unexpected response structure')
    }
    function randomId() {
      return Math.floor(100000 + Math.random() * 900000)
    }

    let bufferImage = Buffer.from(json.result.image, 'base64')

    let tempImagePath = path.join(os.tmpdir(), 'tempImage.png')
    fs.writeFileSync(tempImagePath, bufferImage)
    let sticker = new Sticker(tempImagePath, {
      pack: 'Rick-Bot',
      author: 'OwnedbyLIP',
      type: StickerTypes.FULL,
      categories: ['🤩', '🎉'],
      id: randomId(),
      quality: 100,
      background: '#00000000',
    })

    // Send the sticker without buttons
    try {
      await conn.sendMessage(m.chat, await sticker.toMessage())
    } catch (stickerError) {
      console.error('Fehler beim Senden des Stickers:', stickerError)
      m.reply('Fehler beim Senden des Stickers. Sende stattdessen das Bild.')

      // Send the image without buttons
      await conn.sendFile(m.chat, tempImagePath, 'quote.png', 'Hier ist das Zitatbild:', m)
    }

    // Clean up temporary file
    fs.unlinkSync(tempImagePath)

    m.react('🤡')
  } catch (e) {
    console.error(e)
    m.react('😭')
  }
}

handler.help = ['quote']
handler.tags = ['fun']
handler.command = ['quote']

export default handler
