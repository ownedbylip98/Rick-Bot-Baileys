let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats[m.chat].sWelcome = text;
    m.reply(`✅ Willkommensnachricht erfolgreich aktualisiert!`);
  } else {
    throw `✳️ Bitte gib eine neue Willkommensnachricht ein.`;
  }
}

handler.help = ['setwelcome'];
handler.tags = ['group'];
handler.command = ['setwelcome'];
handler.admin = true;
handler.owner = false;

export default handler;
