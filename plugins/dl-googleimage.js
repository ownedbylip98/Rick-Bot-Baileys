import pkg from 'api-qasim'; // Importiere das gesamte Paket als 'pkg'
import fetch from 'node-fetch'; // Importiere fetch, um den Bilddownload zu handhaben

const { googleImage } = pkg; // Extrahiere die 'googleImage' Funktion aus dem Paket

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("Bitte gib eine Suchanfrage für die Google Bildersuche ein.");
  }

  try {
    // Füge "warten" Reaktion hinzu, um anzuzeigen, dass die Anfrage bearbeitet wird
    await m.react('⏳');

    // Extrahiere die Suchanfrage aus dem Text
    const searchQuery = text.trim();

    // Hole Bild-URLs von der Google Bildersuche API
    let googleImageResponse = await googleImage(searchQuery);

    // Logge die Antwort zur Fehlerbehebung
    console.log('Google Bildersuche Ergebnisse:', googleImageResponse);

    // Überprüfe, ob die API gültige Bild-URLs zurückgegeben hat
    if (!googleImageResponse || !googleImageResponse.imageUrls || googleImageResponse.imageUrls.length === 0) {
      await m.react('✅');
      return m.reply("Keine Bilder für die Suchanfrage gefunden.");
    }

    // Begrenze auf die ersten vier Bild-URLs
    const imageUrls = googleImageResponse.imageUrls.slice(0, 4);

    // Initialisiere ein Array, um die Bildpuffer zu halten
    const imageBuffers = [];

    // Lade die ersten vier Bilder herunter
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const response = await fetch(imageUrl);
      
      // Stelle sicher, dass das Bild erfolgreich abgerufen wurde
      if (response.ok) {
        const buffer = await response.buffer(); // Hole Bilddaten als Puffer
        imageBuffers.push(buffer);
      } else {
        console.log(`Fehler beim Abrufen des Bildes an Index ${i}: ${imageUrl}`);
      }
    }

    // Sende die ersten vier Bilder an den Benutzer im WhatsApp-Chat
    for (let i = 0; i < imageBuffers.length; i++) {
      const imageBuffer = imageBuffers[i];
      await conn.sendMessage(m.chat, {
        image: imageBuffer,
        caption: `Bild ${i + 1} von der Suchanfrage *${searchQuery}*`,
      }, { quoted: m });
    }

    // Reagiere mit "fertig" Emoji, nachdem der Prozess abgeschlossen ist
    await m.react('✅');

  } catch (error) {
    console.error('Fehler:', error);
    m.reply("Ein Fehler ist aufgetreten beim Abrufen oder Herunterladen der Bilder.");
  }
};

handler.help = ['gimage', 'googleimage'];
handler.tags = ['search'];
handler.command = ['gimage', 'googleimage'];

export default handler;
