import pkg from 'api-qasim'
const { xdown } = pkg;

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) throw `✳️ Du musst die URL eines X (Twitter) Videos, Posts, Reels oder Bildes angeben.`;

  await m.react('⏳'); // React with a loading emoji

  let res;
  try {
    res = await xdown(text); // Get the download link from the API
  } catch (error) {
    throw `❌ Ein Fehler ist beim Abrufen der Medien aufgetreten: ${error.message}`;
  }

  // Check if response contains media
  if (!res || !res.media || res.media.length === 0) {
    throw '❌ Keine Medien für die angegebene URL gefunden.';
  }

  // Process the media array
  const mediaArray = res.media;

  for (const mediaData of mediaArray) {
    const mediaType = mediaData.type;
    const mediaURL = mediaData.url;

    let caption = `Hier ist das ${mediaType.toUpperCase()}\n\n*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 © Rick-Bot*`;

    // Send media based on type
    if (mediaType === 'video') {
      await conn.sendFile(m.chat, mediaURL, 'x.mp4', caption, m);
    } else if (mediaType === 'image') {
      await conn.sendFile(m.chat, mediaURL, 'x.jpg', caption, m);
    } else {
      // If the media type is unknown
      await m.reply(`❌ Nicht unterstützter Medientyp: ${mediaType}`);
    }
  }

  await m.react('✅'); // React with a success emoji
};

handler.help = ['Twitter', 'xdl'];
handler.tags = ['downloader'];
handler.command = /^(twitter|xdl)$/i;

export default handler;
