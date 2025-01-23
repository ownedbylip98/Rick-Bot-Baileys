let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  // Teile den Nachrichtentext mit dem '|' Zeichen und entferne das erste Element des Arrays.
  let a = text.split('|').slice(1)
  if (!a[1]) throw 'Format\n' + usedPrefix + command + ' hallo |ja|nein'
  if (a[12]) throw 'Zu viele Optionen, Format\n' + usedPrefix + command + ' hallo |ja|nein'
  // Überprüfe auf doppelte Optionen in der Umfrage.
  if (checkDuplicate(a)) throw 'Doppelte Optionen in der Nachricht!'
  let cap = '*Umfrageanfrage von* ' + m.name + '\n*Nachricht:* ' + text.split('|')[0]

  const pollMessage = {
    name: cap,
    values: a,
    multiselect: false,
    selectableCount: 1,
  }

  await conn.sendMessage(m.chat, {
    poll: pollMessage,
  })
}

handler.help = ['umfrage frage|option|option']
handler.tags = ['gruppe']
handler.command = /^umfrage$/i

export default handler

// Funktion zur Überprüfung auf doppelte Elemente in einem Array.
function checkDuplicate(arr) {
  return new Set(arr).size !== arr.length
}
