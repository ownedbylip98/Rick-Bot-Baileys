import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("Gib den Namen der App ein, nach der du suchen möchtest.");
  }

  try {
    // Füge "Warten"-Reaktion hinzu, um anzuzeigen, dass die Anfrage bearbeitet wird
    await m.react('⏳');
    
    const response = await fetch(`https://global-tech-api.vercel.app/apksearch?query=${text}`);
    
    // Logge die API-Antwort in die Konsole
    const data = await response.json();
    console.log("API-Antwort:", data); // Logge die vollständige Antwort

    // Überprüfe, ob die Antwort Daten enthält
    if (!data.data || data.data.length === 0) {
      // Reagiere mit "Fertig"-Emoji, falls keine Ergebnisse gefunden wurden
      await m.react('✅');
      return m.reply("Keine Mods für die gesuchte Anwendung gefunden.");
    }

    let caption = `Suchergebnisse für *${text}*:\n\n`;

    // Schleife durch die Ergebnisse und formatiere die Antwort
    data.data.forEach((result, index) => {
      if (result.title && result.url && result.updated && result.size) {
        caption += `
${index + 1}. *Titel:* ${result.title}
*Version:* ${result.version}
*Größe:* ${result.size}
*Aktualisiert:* ${result.updated}
*Download-Link:* ${result.url}
\n`;
      }
    });

    // Reagiere mit "Fertig"-Emoji, nachdem der Prozess abgeschlossen ist
    await m.react('✅');
    
    // Sende die formatierte Nachricht
    await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
  } catch (error) {
    console.error("Fehler bei der Mod-Suche:", error);
    m.reply("Ein Fehler ist bei der Suche nach Mods aufgetreten.");
  }
};

handler.help = ['apksearch'];
handler.tags = ['search'];
handler.command = /^(apksearch|searchapk)$/i;
handler.group = false;

export default handler;
