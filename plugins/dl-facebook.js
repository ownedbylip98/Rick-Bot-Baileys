import pkg from 'api-qasim';
const { fbdl } = pkg;

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) throw 'Du musst die URL des Facebook-Videos angeben.';

  m.react('⌛'); // Zeigt an, dass der Bot die Anfrage bearbeitet

  let res;
  try {
    // Video-Daten mit fbdl abrufen
    res = await fbdl(text);
    
    // Protokolliere die Antwort, um ihre Struktur zu überprüfen
    console.log("API-Antwort:", res); 

    // Überprüfe, ob res.data existiert und ein Array ist
    if (!res || !res.data || !Array.isArray(res.data)) {
      throw 'Keine Videodaten gefunden oder die Antwortstruktur ist falsch.';
    }

    let data = res.data; // Extrahiere Videodaten aus der Antwort

    // Überprüfe, ob eine gültige Video-URL vorhanden ist (finde das erste gültige Element mit 'url')
    const validVideo = data.find(item => item.url);

    if (!validVideo) {
      throw 'Keine gültige Video-URL in der Antwort gefunden.';
    }

    const videoURL = validVideo.url;  // Hole die Video-URL vom ersten gültigen Element
    console.log("Gefundene Video-URL:", videoURL); // Protokolliere die Video-URL zur Fehlerbehebung

    // Wenn eine Video-URL gefunden wurde, sende das Video
    m.react('✅'); // Zeigt an, dass das Video bereit ist, gesendet zu werden

    const cap = 'Hier ist das Video, das du angefordert hast:';
    await conn.sendFile(m.chat, videoURL, 'video.mp4', cap, m);

  } catch (error) {
    console.error("Fehler:", error);
    throw `Ein Fehler ist bei der Verarbeitung der Anfrage aufgetreten: ${error.message}`;
  }
};

handler.help = ['Facebook'];
handler.tags = ['downloader'];
handler.command = /^(facebook|fb|fbdl)$/i;

export default handler;
