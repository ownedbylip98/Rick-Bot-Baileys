import remini from '../lib/remini.js'; // Importing the remini function

let handler = async (m, { conn, usedPrefix, command, quoted }) => {
  try {
    let q = quoted ? quoted : m;
    
    console.log('Zitiert:', q);

    let mime = (q.msg || q).mimetype || q.mediaType || '';
    console.log('Mime:', mime);

    if (!mime) {
      console.error('❌ Kein Mime-Typ gefunden.');
      return m.reply(`❌ Bitte antworte auf ein Bild mit der Beschriftung *${usedPrefix + command}*`);
    }

    if (!/image\/(jpe?g|png)/.test(mime)) {
      console.error(`❌ Die zitierte Nachricht enthält kein gültiges Bild. Mime: ${mime}`);
      return m.reply(`❌ Bitte antworte mit einem Bild, um *${usedPrefix + command}* zu verwenden`);
    }

    await conn.reply(m.chat, '⏳ Bild wird verarbeitet... Bitte warte einen Moment.', m);

    let media;
    try {
      console.log('Bild wird heruntergeladen...');
      media = await q.download();
      if (!Buffer.isBuffer(media)) {
        console.error('❌ Ungültiger Bildpuffer von zitierter Nachricht erhalten.');
        return m.reply('❌ Das zitierte Bild ist ungültig. Bitte versuche es erneut.');
      }
      console.log('Bild heruntergeladen:', media);
    } catch (error) {
      console.error('❌ Fehler beim Herunterladen des Bildes von zitierter Nachricht:', error);
      return m.reply('❌ Etwas ist schief gelaufen beim Herunterladen des Bildes. Bitte versuche es erneut.');
    }

    let enhancementMethod;
    switch (command) {
      case 'dehaze':
        enhancementMethod = 'dehaze';
        break;
      case 'recolor':
        enhancementMethod = 'recolor';
        break;
      case 'hdr':
        enhancementMethod = 'enhance';
        break;
      case 'remini':
      default:
        enhancementMethod = 'enhance';
        break;
    }

    try {
      console.log(`Bild wird mit Methode verbessert: ${enhancementMethod}...`);
      let enhancedImage = await remini(media, enhancementMethod);
      console.log('Bild erfolgreich verbessert.');

      await conn.sendMessage(m.chat, {
        image: enhancedImage,
        caption: `*𝘗𝘖𝘞𝘌𝘙𝘌𝘋 𝘉𝘠 © 𝘙𝘐𝘊𝘒-𝘉𝘖𝘛*\nGenieße das verbesserte Bild!`
      }, { quoted: m });
    } catch (error) {
      console.error('❌ Fehler beim Verbessern des Bildes:', error);
      return m.reply('❌ Etwas ist schief gelaufen beim Verbessern des Bildes. Bitte versuche es später erneut.');
    }
  } catch (error) {
    console.error('❌ Unerwarteter Fehler:', error);
    return m.reply('❌ Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.');
  }
};

// Command definition
handler.help = ['remini', 'dehaze', 'recolor', 'hdr'];
handler.tags = ['image'];
handler.command = ['remini', 'dehaze', 'recolor', 'hdr'];

export default handler;
