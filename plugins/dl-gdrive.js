import pkg from 'nayan-videos-downloader';
const { GDLink } = pkg;

// Einfache Retry-Funktion für Fetch-Anfragen
const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Fehler beim Abrufen, Statuscode: ${response.status}`);
    return response;
  } catch (error) {
    if (retries === 0) throw new Error('Maximale Anzahl an Versuchen erreicht. Konnte die Medien nicht abrufen.');
    console.log(`Abrufen fehlgeschlagen, versuche erneut... (${retries} Versuche übrig)`);
    await new Promise(resolve => setTimeout(resolve, delay)); // Verzögerung vor erneutem Versuch
    return fetchWithRetry(url, options, retries - 1, delay); // Erneut versuchen
  }
};

const handler = async (m, { conn, args }) => {
  if (!args[0]) throw '✳️ Gib den Google Drive Video-Link neben dem Befehl ein';

  m.react('⏳');
  try {
    const url = args[0];
    console.log('Überprüfe Link:', url);

    // Abrufen der Mediendaten von Google Drive mit der GDLink-Methode aus dem Paket
    let mediaData;
    try {
      mediaData = await GDLink(url); // Daten von Google Drive abrufen
      console.log('Mediendaten:', mediaData);
    } catch (error) {
      console.error('Fehler beim Abrufen der Google Drive-Daten:', error.message);
      throw new Error('Konnte die Google Drive-Daten nicht abrufen');
    }

    // Sicherstellen, dass mediaData und die notwendige 'data'-Eigenschaft existieren
    if (!mediaData || !mediaData.data) {
      throw new Error('Keine gültige Medien-URL gefunden');
    }

    // Der tatsächliche Download-Link befindet sich in der 'data'-Eigenschaft
    const mediaUrl = mediaData.data;
    console.log('Medien-URL:', mediaUrl);

    // Abrufen des Medieninhalts
    const response = await fetchWithRetry(mediaUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, wie Gecko) Chrome/85.0.4183.121 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      }
    });

    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);

    if (!contentType) {
      throw new Error('Kein Content-Type erhalten');
    }

    // Video-Download behandeln
    if (contentType.includes('video')) {
      const arrayBuffer = await response.arrayBuffer();
      const mediaBuffer = Buffer.from(arrayBuffer);

      if (mediaBuffer.length === 0) throw new Error('Heruntergeladenes Video ist leer');

      const fileName = mediaData.title ? `${mediaData.title}.mp4` : 'media.mp4';
      const mimetype = 'video/mp4';

      await conn.sendFile(m.chat, mediaBuffer, fileName, '*Powered by Ultra-MD*', m, false, { mimetype });
      m.react('✅');
    }
    // Bild-Download behandeln
    else if (contentType.includes('image')) {
      const arrayBuffer = await response.arrayBuffer();
      const mediaBuffer = Buffer.from(arrayBuffer);

      if (mediaBuffer.length === 0) throw new Error('Heruntergeladenes Bild ist leer');

      const fileName = mediaData.title ? `${mediaData.title}.jpg` : 'media.jpg';
      const mimetype = 'image/jpeg';

      await conn.sendFile(m.chat, mediaBuffer, fileName, '*Powered by Ultra-MD*', m, false, { mimetype });
      m.react('✅');
    } else {
      throw new Error('Nicht unterstützter Medientyp');
    }

  } catch (error) {
    console.error('Fehler bei der Verarbeitung des Google Drive-Downloads:', error.message);
    await m.reply('⚠️ Ein Fehler ist bei der Verarbeitung der Anfrage aufgetreten. Bitte versuche es später erneut.');
    m.react('❌');
  }
};

// Globaler Handler für nicht behandelte Promise-Ablehnungen
process.on('unhandledRejection', (reason, promise) => {
  console.error('Nicht behandelte Ablehnung bei:', promise, 'Grund:', reason);
});

handler.help = ['gdrive'];
handler.tags = ['downloader'];
handler.command = ['gd', 'gdrive'];

export default handler;
