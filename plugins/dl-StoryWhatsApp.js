const handler = async (m, { conn, args, usedPrefix, command }) => {
  // Nur fortfahren, wenn das Befehlsmuster übereinstimmt
  if (!command) return;

  if ("status@broadcast" != m.quoted?.chat) throw "Zitiere die Statusnachricht, um sie herunterzuladen.";
  try {
    let buffer = await m.quoted?.download();
    await conn.sendFile(m.chat, buffer, "", m.quoted?.text || "", m, false, {
      quoted: m
    });
  } catch (e) {
    console.log(e);
    await conn.reply(m.chat, m.quoted?.text || "Fehler beim Herunterladen des Status", m);
  }
};

handler.help = ["downloadsw"];
handler.tags = ["tools"];
handler.command = /^((sw|status)(dl|download)|(dl|download)(sw|status))$/i;

export default handler;
