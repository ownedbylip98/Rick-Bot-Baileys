let handler = async (m, { conn }) => {
  if (global.conn.user.jid === conn.user.jid) {
    await conn.reply(m.chat, `*Miete wurde erfolgreich gestoppt*`, m);
  } else {
    // If the number does not match, stop the bot.
    await conn.reply(m.chat, '*Warum gehst du nicht direkt zum Terminal?*', m);
    conn.ws.close();
  }
};

handler.help = ['stop'];
handler.tags = ['bebot'];
handler.command = ['stopbebot', 'stoprent'];
handler.owner = true;

export default handler;
