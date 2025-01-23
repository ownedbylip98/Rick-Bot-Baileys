let handler = async (m, { conn, isROwner, text }) => {
  const delay = time => new Promise(res => setTimeout(res, time))
  let getGroups = await conn.groupFetchAllParticipating()
  let groups = Object.entries(getGroups)
    .slice(0)
    .map(entry => entry[1])
  let anu = groups.map(v => v.id)
  var pesan = m.quoted && m.quoted.text ? m.quoted.text : text
  if (!pesan) throw '*GIB DIE NACHRICHT EIN, DIE DU SENDEN MÖCHTEST*'
  for (let i of anu) {
    await delay(500)
    conn
      .relayMessage(
        i,
        {
          liveLocationMessage: {
            degreesLatitude: 35.685506276233525,
            degreesLongitude: 139.75270667105852,
            accuracyInMeters: 0,
            degreesClockwiseFromMagneticNorth: 2,
            caption: '[ACHTUNG]\n\n' + pesan + '\n\nDIES IST EINE OFFIZIELLE MITTEILUNG',
            sequenceNumber: 2,
            timeOffset: 3,
            contextInfo: m,
          },
        },
        {}
      )
      .catch(_ => _)
  }
  m.reply(
    `*NACHRICHT AN ${anu.length} GRUPPE(N) GESENDET*\n\n*HINWEIS: DIESER BEFEHL KANN FEHLSCHLAGEN UND NICHT AN ALLE CHATS GESENDET WERDEN, ENTSCHULDIGUNG FÜR DIE UNANNEHMLICHKEITEN*`
  )
}
handler.help = ['broadcastgroup', 'bcgc'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(group|grup|gc)$/i
handler.owner = true

export default handler
