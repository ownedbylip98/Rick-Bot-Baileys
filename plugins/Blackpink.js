import fetch from 'node-fetch'

let bpink = []

// Abrufen der Bild-URLs aus der Textdatei
fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kpop/blekping.txt')
  .then(res => res.text())
  .then(txt => (bpink = txt.split('\n')))

let handler = async (m, { conn }) => {
  try {
    // Sende "Warten"-Reaktion, um anzuzeigen, dass der Bot verarbeitet
    await m.react('⏳')

    // Wähle ein zufälliges Bild aus der Liste
    let img = bpink[Math.floor(Math.random() * bpink.length)]

    // Wenn kein Bild ausgewählt wird, einen Fehler werfen
    if (!img) throw img

    // Bild abrufen und arrayBuffer in einen Buffer konvertieren
    const response = await fetch(img)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Sende das Bild mit einem Thumbnail und einer benutzerdefinierten Nachricht
    await conn.sendFile(m.chat, img, '', '*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 © 𝚁𝙸𝙲𝙺-𝙱𝙾𝚃*', m, 0, {
      thumbnail: buffer, // Verwende den Buffer für das Thumbnail
    })

    // Nach der Verarbeitung die "Fertig"-Reaktion senden
    await m.react('✅')
  } catch (error) {
    console.error('Fehler beim Abrufen des Bildes:', error)
    await m.react('❌')  // Sende eine "Fehlgeschlagen"-Reaktion, wenn ein Fehler auftritt
    m.reply('❌ Etwas ist schief gelaufen beim Abrufen des Bildes. Bitte versuche es später erneut.')
  }
}

handler.help = ['blackpink']
handler.tags = ['image']
handler.limit = false
handler.command = /^(bpink|bp|blackpink)$/i

export default handler
