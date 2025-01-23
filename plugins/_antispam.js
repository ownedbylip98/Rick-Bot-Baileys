//Danke Chatgpt🤡
import { performance } from 'perf_hooks'

// Diese Funktion wird verwendet, um zu verhindern, dass Benutzer zu viele Nachrichten in einer Chat-Anwendung oder einem Bot senden.

export async function before(m) {
  // Informationen über Benutzer und Chats aus globalen Daten abrufen.
  const users = global.db.data.users
  const chats = global.db.data.chats

  // Verschiedene Bedingungen überprüfen, um festzustellen, ob Anti-Spam-Maßnahmen angewendet werden sollen.

  // Wenn Anti-Spam für diesen Chat deaktiviert ist, oder wenn die Nachricht vom Bot selbst stammt,
  // oder wenn der Nachrichtentyp eine Systemnachricht oder eine Umfrageaktualisierung ist, nichts tun und die Funktion verlassen.
  if (
    !chats[m.chat].antiSpam ||
    m.isBaileys ||
    m.mtype === 'protocolMessage' ||
    m.mtype === 'pollUpdateMessage' ||
    m.mtype === 'reactionMessage'
  ) {
    return
  }

  // Wenn keine Nachricht vorhanden ist, oder wenn der Absender gesperrt ist, oder wenn der Chat gesperrt ist,
  // nichts tun und die Funktion verlassen.
  if (
    !m.msg ||
    !m.message ||
    m.key.remoteJid !== m.chat ||
    users[m.sender].banned ||
    chats[m.chat].isBanned
  ) {
    return
  }

  // Ein 'spam'-Objekt für den Absender erstellen oder darauf zugreifen, um spambezogene Daten zu verfolgen.
  this.spam = this.spam || {}
  this.spam[m.sender] = this.spam[m.sender] || { count: 0, lastspam: 0 }

  // Die aktuelle Zeit in Millisekunden abrufen.
  const now = performance.now()

  // Die Zeitdifferenz seit der letzten Nachricht von diesem Absender berechnen.
  const timeDifference = now - this.spam[m.sender].lastspam

  // Wenn die Zeitdifferenz weniger als 10 Sekunden beträgt, bedeutet dies, dass der Absender Nachrichten zu schnell sendet.
  if (timeDifference < 10000) {
    // Die Spam-Anzahl des Absenders erhöhen.
    this.spam[m.sender].count++

    // Wenn die Spam-Anzahl des Absenders 5 oder mehr erreicht, den Absender als gesperrt markieren und eine 5-Sekunden-Abklingzeit festlegen.
    if (this.spam[m.sender].count >= 5) {
      users[m.sender].banned = true
      this.spam[m.sender].lastspam = now + 5000

      // Ein Timeout planen, um den Benutzer nach 5 Sekunden zu entsperren und seine Spam-Anzahl zurückzusetzen.
      setTimeout(() => {
        users[m.sender].banned = false
        this.spam[m.sender].count = 0
        m.reply(`✅ *Abklingzeit beendet*\nDu kannst wieder Nachrichten senden.`)
      }, 5000)

      // Den Absender über das Spammen und die verbleibende Abklingzeit informieren.
      const message =
        m.mtype
          .replace(/message$/i, '')
          .replace('audio', m.msg.ptt ? 'PTT' : 'audio')
          .replace(/^./, v => v.toUpperCase()) || 'Unbekannt'
      return m.reply(
        `❌ *Bitte nicht spammen ${message}*\nWarte ${Math.ceil((this.spam[m.sender].lastspam - now) / 1000)} Sekunden`
      )
    }
  } else {
    // Wenn die Zeitdifferenz größer oder gleich 10 Sekunden ist, die Spam-Anzahl des Absenders zurücksetzen.
    this.spam[m.sender].count = 0
  }

  // Den 'lastspam'-Zeitstempel auf die aktuelle Zeit für den Absender aktualisieren.
  this.spam[m.sender].lastspam = now
}
