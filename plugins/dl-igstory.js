import fetch from 'node-fetch';
import pkg from 'nayan-videos-downloader';
const { instagram } = pkg;

const fetchWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, options);
    if (response.ok) return response;
    console.log(`Erneuter Versuch... (${i + 1})`);
  }
  throw new Error('Fehler beim Abrufen des Medieninhalts nach mehreren Versuchen');
};

const handler = async (m, { conn, args }) => {
  if (!args[0]) throw '✳️ Gib den Instagram-Link neben dem Befehl ein';

  // Aktualisierte Regex, um Instagram-Story-Links zu erfassen
  const instagramRegex = /^(https?:\/\/)?(www\.)?(instagram\.com\/stories\/[A-Za-z0-9._%+-]+\/\d+(\?.*)?)$/;

  if (!args[0].match(instagramRegex)) {
    throw '❌ Falscher Link. Bitte stelle sicher, dass es ein gültiger Instagram-Story-Link ist.';
  }

  m.react('⏳');

  try {
    const url = args[0];
    console.log('Link überprüfen:', url);

    const mediaData = await instagram(url);
    console.log('Mediendaten:', mediaData);

    if (!mediaData.status) {
      throw new Error(`Fehler: ${mediaData.msg || 'Fehler beim Abrufen der Mediendaten'}`);
    }

    let downloadUrl;
    if (mediaData.data.video && mediaData.data.video.length > 0) {
      downloadUrl = mediaData.data.video[0]; // Verwende die erste Video-URL
    } else if (mediaData.data.images && mediaData.data.images.length > 0) {
      downloadUrl = mediaData.data.images[0]; // Verwende die erste Bild-URL
    } else {
      throw new Error('Download-URL konnte nicht abgerufen werden');
    }

    console.log('Download-URL:', downloadUrl);

    const response = await fetchWithRetry(downloadUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      }
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || 
        (!contentType.includes('image') && 
        !contentType.includes('octet-stream') && 
        !contentType.includes('video'))) {
      throw new Error('Ungültiger Inhaltstyp empfangen');
    }

    const arrayBuffer = await response.arrayBuffer();
    const mediaBuffer = Buffer.from(arrayBuffer);

    if (mediaBuffer.length === 0) throw new Error('Heruntergeladene Datei ist leer');

    const fileName = mediaData.data.title ? `${mediaData.data.title}.jpg` : 'media.jpg';
    const mimetype = mediaData.data.video.length > 0 ? 'video/mp4' : 'image/jpeg';

    await conn.sendFile(m.chat, mediaBuffer, fileName, '*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 © Rick-Bot*', m, false, { mimetype });
    m.react('✅');
  } catch (error) {
    console.error('Fehler beim Herunterladen von Instagram:', error.message, error.stack);
    await m.reply('⚠️ Ein Fehler ist bei der Verarbeitung der Anfrage aufgetreten. Bitte versuche es später erneut.');
    m.react('❌');
  }
};

handler.help = ['instastory', 'igstory', 'igstorydl', 'instagramstory', 'storyig'];
handler.tags = ['downloader'];
handler.command = ['instastory', 'igstory', 'igstorydl', 'instagramstory', 'storyig'];

export default handler;
