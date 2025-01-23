import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  if (!global.db.data.chats[m.chat].nsfw)
    throw `🚫 Diese Gruppe unterstützt keine NSFW-Inhalte. Aktiviere es mit *${usedPrefix}enable* nsfw.`;

  let userAge = global.db.data.users[m.sender].age;
  if (userAge < 17) throw `❎ Du musst mindestens 18 Jahre alt sein.`;

  try {
    m.reply(global.wait);
    let res = await fetch('https://api.guruapi.tech/hanime/trend');
    let json = await res.json();

    if (!json || json.length === 0) throw 'Keine Daten gefunden';

    let topTrending = json.slice(0, 8);

    let message = '🔥 **Top 8 Trending Hentai der Woche** 🔥\n\n';

    topTrending.forEach((data, index) => {
      message += `
${index + 1}. **${data.name}**
   - 📎 Link: https://hanime.tv/videos/hentai/${data.slug}
   - 👁️ Ansichten: ${data.views}

`;
    });

    await conn.sendFile(m.chat, topTrending[0].cover_url, 'hanime.jpeg', message, m);
  } catch (error) {
    console.error(error);
    throw `*FEHLER: Etwas ist schief gelaufen. Bitte versuche es später erneut.*`;
  }
};

handler.command = /^(hentai)$/i;
export default handler;
