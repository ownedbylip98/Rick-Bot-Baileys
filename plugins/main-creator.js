let handler = async (m, { conn, usedPrefix, isOwner }) => {
  let vcard = `BEGIN:VCARD
VERSION:3.0
N:;LIP;;;
FN:LIP
ORG:OwnedbyLIP
TITLE:Besitzer
item1.TEL;waid=923444844060:923444844060
item1.X-ABLabel:Besitzer
X-WA-BIZ-DESCRIPTION:Entwickler des Bots
X-WA-BIZ-NAME:LIP
END:VCARD`;

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: 'LIP',
      contacts: [{ vcard }]
    }
  }, { quoted: m });
}

handler.help = ['besitzer'];
handler.tags = ['main'];
handler.command = ['creator', 'creador', 'besitzer'];

export default handler;
