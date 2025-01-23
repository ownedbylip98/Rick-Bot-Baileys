import fetch from 'node-fetch';
import pkg from 'nayan-videos-downloader';
const { tikdown } = pkg;

const handler = async (message, { conn, args }) => {
  // Überprüfe, ob die URL in den Befehlsargumenten angegeben ist
  if (!args[0]) {
    throw '✳️ Gib den TikTok-Link neben dem Befehl ein';
  }

  // Überprüfe das URL-Format für TikTok, einschließlich verkürzter URLs wie vm.tiktok.com
  const urlPattern = /(?:https?:\/\/(?:www\.)?)?(tiktok\.com\/(?:[^\/]+\/v\/\d+|[^\/]+\/post\/\d+)|vm\.tiktok\.com\/[\w\d]+)/gi;
  if (!args[0].match(urlPattern)) {
    throw '❌ Ungültiger TikTok-Link';
  }

  // Reagiere mit einem Lade-Emoji, um zu zeigen, dass der Prozess gestartet wurde
  message.react('⏳');

  try {
    // Die URL des TikTok-Videos
    const url = args[0];
    console.log('URL:', url);

    // Medieninhalte mit dem nayan-video-downloader-Paket abrufen
    let mediaData = await tikdown(url);
    console.log('Mediendaten:', mediaData);

    // Überprüfe, ob die Mediendaten eine gültige Video-URL enthalten
    if (!mediaData.data || !mediaData.data.video) {
      throw new Error('Konnte die Video-URL nicht abrufen');
    }

    const videoUrl = mediaData.data.video;
    console.log('Video-URL:', videoUrl);

    // Medieninhalte von der Download-URL abrufen
    const response = await fetch(videoUrl);
    if (!response.ok) {
      throw new Error('Fehler beim Abrufen der Medieninhalte');
    }

    // Die Antwort in einen Array-Puffer konvertieren
    const arrayBuffer = await response.arrayBuffer();
    const mediaBuffer = Buffer.from(arrayBuffer);

    // Sende die Videodatei an den Benutzer
    await conn.sendFile(message.chat, mediaBuffer, 'tiktok.mp4', '*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 © Rick-Bot*', message, false, { mimetype: 'video/mp4' });

    // Reagiere mit einem Erfolgs-Emoji
    message.react('✅');
  } catch (error) {
    // Protokolliere und behandle alle Fehler
    console.error('Fehler beim Herunterladen von TikTok:', error.message, error.stack);
    await message.reply('⚠️ Ein Fehler ist bei der Verarbeitung der Anfrage aufgetreten. Bitte versuche es später erneut.');
    message.react('❌');
  }
};

// Definiere Befehlsmetadaten
handler.help = ['tiktok', 'tt', 'tikdown', 'ttdl'];
handler.tags = ['downloader'];
handler.command = ['tiktok', 'tt', 'tikdown', 'ttdl'];

export default handler;
