const linkRegex = /(?:chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})|https:\/\/whatsapp\.com\/channel\/[0-9A-Za-z]+)/i;

export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;

  // Sicherstellen, dass Chat-Daten in der Datenbank vorhanden sind
  let chat = global.db.data.chats[m.chat];
  if (typeof chat !== 'object') global.db.data.chats[m.chat] = {};
  chat = global.db.data.chats[m.chat];

  // Aktuelle Einstellungen protokollieren, um zu bestätigen, dass sie korrekt geladen wurden
  console.log(`AntiLink ist ${chat.antiLink}, Admin-Status: ${isAdmin}, Bot-Admin: ${isBotAdmin}`);

  // Überprüfen, ob die Nachricht einen Gruppenlink enthält und AntiLink aktiviert ist
  const isGroupLink = linkRegex.exec(m.text);
  if (chat.antiLink && isGroupLink && !isAdmin) {
    console.log(`Ein Link wurde von einem Nicht-Admin erkannt: ${m.sender}`);

    // Überprüfen, ob der Bot Admin ist, um mit dem Entfernen des Benutzers fortzufahren
    if (isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
      if (m.text.includes(linkThisGroup)) return true; // Links zu derselben Gruppe ignorieren

      await conn.reply(
        m.chat,
        `*≡ Link erkannt*
        
Wir erlauben keine Links von anderen Gruppen. 
Es tut mir leid *@${m.sender.split('@')[0]}*, du wirst aus der Gruppe entfernt.`,
        null,
        { mentions: [m.sender] }
      );
      // Die Nachricht mit dem Link löschen
      await conn.sendMessage(m.chat, { delete: m.key });
      // Den Benutzer aus der Gruppe entfernen
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    } else {
      console.log("Bot ist kein Admin und kann keine Mitglieder entfernen.");
    }
  }
  return true;
}
