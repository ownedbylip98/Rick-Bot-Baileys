//import db from '../lib/database.js'

let handler = async (m, { conn }) => {
  const stickerList = Object.entries(global.db.data.sticker)
    .map(
      ([key, value], index) =>
        `${index + 1}. ${value.locked ? `(gesperrt) ${key}` : key} : ${value.text}`
    )
    .join('\n');

  conn.reply(
    m.chat,
    `
*BEFEHLSLISTE*

▢ *Info:* Wenn es *fett* ist, ist es gesperrt

──────────────────
${stickerList}
`.trim(),
    null,
    {
      mentions: Object.values(global.db.data.sticker)
        .map(x => x.mentionedJid)
        .flat(), // Verwende flat(), um das Array zu glätten
    }
  );
}

handler.help = ['listcmd'];
handler.tags = ['cmd'];
handler.command = ['listcmd'];

export default handler;
