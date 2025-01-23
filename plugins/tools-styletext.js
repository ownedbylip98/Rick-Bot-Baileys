import pkg from 'api-qasim';  // Importiere das `api-qasim` Paket
const { styletext } = pkg;  // Destrukturiere `styletext` von `api-qasim`

const handler = async (m, { conn, command, text, args, usedPrefix }) => {
  if (!text) throw `Bitte gib einen Text an. Beispiel: *${usedPrefix + command} Hallo*`;

  try {
    // Wende die styletext Funktion auf den angegebenen Text an
    const styledResult = await styletext(text);  // Angenommen, styletext ist asynchron

    // Stelle sicher, dass das Ergebnis ein Array ist
    if (Array.isArray(styledResult)) {
      let styledMessage = `Wähle eine gestylte Version des Textes, indem du mit der Nummer antwortest:\n\n`;

      // Schleife durch das Ergebnis und überprüfe die Struktur, bevor auf Eigenschaften zugegriffen wird
      styledResult.forEach((item, index) => {
        // Logge jedes Element der Antwort, um die Struktur zu verstehen
        console.log(`Gestylter Text ${index + 1}:`, item);

        // Stelle sicher, dass wir einen gültigen `name` und `result` zum Anzeigen haben
        const styledText = item.result || item;  // Verwende 'result' für den transformierten Text
        const styleName = item.name || `Stil ${index + 1}`;  // Fallback auf Standardstilname, falls nicht angegeben
        styledMessage += `*${index + 1}.* ${styledText}\n`;
      });

      // Sende die Liste der gestylten Versionen an den Benutzer
      const { key } = await conn.reply(m.chat, styledMessage, m);

      // Initialisiere die Sitzungspeicherung für die ausgewählten Stile
      conn.styletext = conn.styletext || {};  // Initialisiere die Sitzungspeicherung, falls noch nicht geschehen
      conn.styletext[m.sender] = {
        result: styledResult,
        key, // Speichere den Nachrichtenschlüssel, um später zu löschen
        timeout: setTimeout(() => {
          conn.sendMessage(m.chat, { delete: key });
          delete conn.styletext[m.sender];
        }, 150 * 1000), // Timeout nach 2,5 Minuten
      };
    } else {
      // Wenn das Ergebnis kein Array ist, informiere den Benutzer
      await conn.reply(m.chat, `Kein gestylter Text für die angegebene Eingabe gefunden.`, m);
    }
  } catch (error) {
    console.error('Fehler beim Anwenden von styletext:', error);
    await conn.reply(m.chat, `❎ Fehler beim Stylen des Textes: ${error.message || error}`, m);
  }
};

handler.before = async (m, { conn }) => {
  // Stelle sicher, dass die Sitzungspeicherung initialisiert ist, bevor darauf zugegriffen wird
  conn.styletext = conn.styletext || {};

  // Stelle sicher, dass der Benutzer die Optionen erhalten und mit einer Nummer geantwortet hat
  if (m.isBaileys || !(m.sender in conn.styletext)) return;

  const { result, key, timeout } = conn.styletext[m.sender];

  // Überprüfe die Antwort und die Eingabenummer
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;

  const choice = m.text.trim();
  const inputNumber = Number(choice);

  // Überprüfe die Auswahl des Benutzers
  if (inputNumber >= 1 && inputNumber <= result.length) {
    const selectedStyledText = result[inputNumber - 1].result || result[inputNumber - 1];  // Greife auf 'result' für den transformierten Text zu

    try {
      // Sende den ausgewählten gestylten Text an den Benutzer
      await conn.reply(m.chat, `${selectedStyledText}`, m);
      clearTimeout(timeout); // Lösche das Timeout für die Sitzung

      // Bereinige die Sitzung
      delete conn.styletext[m.sender];
    } catch (error) {
      console.error("Fehler beim Senden des ausgewählten gestylten Textes:", error);
      await conn.reply(m.chat, `❎ Fehler beim Senden des gestylten Textes: ${error.message || error}`, m);
    }
  } else {
    await conn.reply(m.chat, `❎ Ungültige Auswahl. Bitte wähle eine Nummer zwischen 1 und ${result.length}.`, m);
  }
};

handler.help = ['styletext'];
handler.tags = ['utility'];
handler.command = /^(styletext)$/i;

export default handler;
