let handler = async function (m, { conn, text, usedPrefix }) {
  let m2 = `≡ Verwende diese Befehle ohne das Präfix: *${usedPrefix}*
┌─⊷ *AUDIOS* 
▢ Bot
▢ Guten Morgen
▢ Guten Nachmittag
▢ Guten Abend
▢ Feine Herren
▢ Sei nicht traurig
└──────────────`;
  
  let pp = './assets/A.jpg';

  // Send a button message
  await conn.sendButton(m.chat, m2, 'Rick-Bot', pp, [
    ['⏍ Info', `${usedPrefix}botinfo`],
    ['⌬ Gruppe', `${usedPrefix}grp`]
  ], m, { quoted: m });

  // Send an image file
  await conn.sendFile(m.chat, pp, 'menu.jpg', m2, m);
}

handler.help = ['menu3'];
handler.tags = ['main'];
handler.command = ['menu3', 'audios'];

export default handler;
