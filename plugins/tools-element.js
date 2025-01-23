import fetch from 'node-fetch'

let elementHandler = async (m, { conn, text }) => {
  if (!text) throw 'Bitte gib ein Elementsymbol oder einen Namen ein'

  try {
    let res = await fetch(`https://api.popcat.xyz/periodic-table?element=${text}`)

    if (!res.ok) {
      throw new Error(`API-Anfrage fehlgeschlagen mit Status ${res.status}`)
    }

    let buffer = await res.arrayBuffer()
    let json = JSON.parse(Buffer.from(buffer).toString())

    console.log('JSON-Antwort:', json)

    let elementInfo = `*Elementinformationen:*\n
     • *Name:* ${json.name}\n
     • *Symbol:* ${json.symbol}\n
     • *Ordnungszahl:* ${json.atomic_number}\n
     • *Atommasse:* ${json.atomic_mass}\n
     • *Periode:* ${json.period}\n
     • *Phase:* ${json.phase}\n
     • *Entdeckt von:* ${json.discovered_by}\n
     • *Zusammenfassung:* ${json.summary}`

    conn.sendFile(m.chat, json.image, 'element.jpg', elementInfo, m)
  } catch (error) {
    console.error(error)
    // Fehler entsprechend behandeln
  }
}

elementHandler.help = ['element']
elementHandler.tags = ['tools']
elementHandler.command = /^(element|ele)$/i

export default elementHandler
