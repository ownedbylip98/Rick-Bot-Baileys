let handler = async (m, { conn }) => {
  if (!conn) {
    console.error('Verbindungsobjekt ist undefiniert');
    return; // oder den Fehler entsprechend behandeln
  }

  const ownerNumber = global.owner[0] ? global.owner[0][0] : 'default_number_here'; // Fallback

  let vcard = `BEGIN:VCARD
VERSION:3.0
N:;${ownerNumber};;;
FN:Besitzer
ORG:OwnedbyLIP
TITLE:Besitzer
item1.TEL;waid=${ownerNumber}:${ownerNumber}
item1.X-ABLabel:Besitzer
X-WA-BIZ-DESCRIPTION:Besitzer des Bots
X-WA-BIZ-NAME:Besitzer
END:VCARD`;

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: 'Besitzer',
      contacts: [{ vcard }]
    }
  }, { quoted: m });
}

handler.help = ['besitzer'];
handler.tags = ['main'];
handler.command = ['besitzer'];

export default handler;
