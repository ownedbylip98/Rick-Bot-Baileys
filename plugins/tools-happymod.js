import pkg from 'api-qasim';
const { happymod } = pkg;

const handler = async (m, { conn, command, text, args, usedPrefix }) => {
  if (!text) throw `Bitte gib eine Suchanfrage für APKs an. Beispiel: *${usedPrefix + command}* Telegram`;

  try {
    // Suche nach APKs mit happymod
    const searchResults = await happymod(text);
    await m.react('⏳');

    // Überprüfe, ob es Ergebnisse gibt
    if (searchResults && Array.isArray(searchResults.data) && searchResults.data.length > 0) {
      let apkListMessage = `*Wähle eine APK aus der Liste, indem du mit der Nummer antwortest:*\n\n`;

      // Schleife durch die Ergebnisse und überprüfe die Struktur, bevor auf Eigenschaften zugegriffen wird
      searchResults.data.forEach((item, index) => {
        console.log(`APK ${index + 1}:`, item);

        // Stelle sicher, dass wir gültige Details (Titel, Bewertung) haben, bevor sie angezeigt werden
        const apkTitle = item.title || `APK ${index + 1}`;
        const apkRating = item.rating || "N/A";
        const apkLink = item.link || "#";  // Fallback-URL oder Kennung bereitstellen

        apkListMessage += `*${index + 1}.* ${apkTitle} (Bewertung: ${apkRating})\n\n`;
      });

      // Sende die Liste der APKs an den Benutzer
      const { key } = await conn.reply(m.chat, apkListMessage, m);

      // Initialisiere die Sitzungsspeicherung für die ausgewählte APK
      conn.happymod = conn.happymod || {};  // Initialisiere die Sitzungsspeicherung, falls noch nicht geschehen
      conn.happymod[m.sender] = {
        result: searchResults.data,  // Speichere die Liste der APKs
        key, // Speichere den Nachrichtenschlüssel zum späteren Löschen
        timeout: setTimeout(() => {
          conn.sendMessage(m.chat, { delete: key });
          delete conn.happymod[m.sender];
        }, 150 * 1000), // Timeout nach 2,5 Minuten
      };
    } else {
      // Wenn keine Ergebnisse, informiere den Benutzer
      await conn.reply(m.chat, `Keine APKs für die angegebene Suchanfrage gefunden.`, m);
    }
  } catch (error) {
    console.error('Fehler bei der APK-Suche:', error);
    await conn.reply(m.chat, `❎ Fehler bei der Suche nach APKs: ${error.message || error}`, m);
  }
};

handler.before = async (m, { conn }) => {
  // Stelle sicher, dass die Sitzungsspeicherung initialisiert ist, bevor darauf zugegriffen wird
  conn.happymod = conn.happymod || {};

  // Stelle sicher, dass der Benutzer die Optionen erhalten und mit einer Nummer geantwortet hat
  if (m.isBaileys || !(m.sender in conn.happymod)) return;

  const { result, key, timeout } = conn.happymod[m.sender];

  // Überprüfe die Antwort und die eingegebene Nummer
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;

  const choice = m.text.trim();
  const inputNumber = Number(choice);

  // Überprüfe die Auswahl des Benutzers
  if (inputNumber >= 1 && inputNumber <= result.length) {
    const selectedApk = result[inputNumber - 1];  // Hole die ausgewählte APK
    const { title, rating, link, thumb } = selectedApk;  // Hole die Details der ausgewählten APK

    try {
      // Sende die Details der ausgewählten APK an den Benutzer
      await conn.reply(m.chat, `*Details der ausgewählten APK:*\n\nTitel: ${title}\nBewertung: ${rating}\nDownload-Link: ${link}`, m);
      await m.react('✅');
      clearTimeout(timeout); // Lösche das Timeout für die Sitzung

      // Bereinige die Sitzung
      delete conn.happymod[m.sender];
    } catch (error) {
      console.error("Fehler beim Senden der ausgewählten APK:", error);
      await conn.reply(m.chat, `❎ Fehler beim Senden der APK-Details: ${error.message || error}`, m);
    }
  } else {
    await conn.reply(m.chat, `❎ Ungültige Auswahl. Bitte wähle eine Nummer zwischen 1 und ${result.length}.`, m);
  }
};

handler.help = ['happymod'];
handler.tags = ['media'];
handler.command = /^(happymod)$/i;

export default handler;
