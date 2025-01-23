import { createHash } from 'crypto'

let handler = async function (m, { conn, text, usedPrefix, command, quoted }) {
  let user = global.db.data.users[m.sender]

  // Überprüfe, ob der Benutzer bereits registriert ist
  if (user.registered) {
    return m.reply(`Du bist bereits registriert!`) 
  }

  if (!text) throw `⚠️ Falsches Format\n\nBitte gib eine Vorstellung im folgenden Format ein:\n\n${usedPrefix + command} Name.Alter.Wohnort.Beziehungsstatus`

  let [name, age, location, relationship] = text.split('.')
  if (!name) throw '✳️ Der Name darf nicht leer sein'
  if (!age) throw '✳️ Das Alter darf nicht leer sein'
  if (!location) throw '✳️ Der Wohnort darf nicht leer sein'
  if (!relationship) throw '✳️ Der Beziehungsstatus darf nicht leer sein'
  if (name.length >= 30) throw '✳️ Der Name ist zu lang'
  age = parseInt(age)
  if (age > 100) throw '👴🏻 Wow Opa will Bot spielen'
  if (age < 5) throw '🚼 Da ist ein Baby-Opa jsjsj'

  user.name = name.trim()
  user.age = age
  user.location = location.trim()
  user.relationship = relationship.trim()
  user.registered = true // Markiere den Benutzer als registriert

  let sn = createHash('md5').update(m.sender).digest('hex')

  let image 
  try {
    image = await conn.profilePictureUrl(m.sender, 'image')
  } catch (e) {
    if (!quoted || !quoted.message || !quoted.message.imageMessage) {
      throw `⚠️ Kein Profilbild gefunden und kein Bild markiert. Bitte markiere ein Bild oder stelle sicher, dass du ein Profilbild hast.`
    }
    image = await conn.downloadMediaMessage(quoted.message)
  }

  await conn.sendFile(m.chat, image, 'vorstellung.jpg',
    `
╭───「 👤 ${name} 」────────────
│                 
│             🎂 ${age} Jahre  
│             🌎 ${location}   
│             ❤️ ${relationship} 
│                 
╰─────────────────────
`.trim(), m)

  // Speichere das Bild in der Datenbank (optional)
  // user.profilePicture = image // Du musst image möglicherweise in ein geeignetes Format konvertieren (z.B. Base64)

}

handler.help = ['vorstellung <Name.Alter.Wohnort.Beziehungsstatus>']
handler.tags = ['main']
handler.command = ['vorstellung', 'vorstellen', 'intro', 'reg']

export default handler

