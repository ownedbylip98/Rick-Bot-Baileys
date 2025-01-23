let handler = async (m, { conn, text }) => {
  let who;
  if (m.isGroup) {
    who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  } else {
    who = m.chat;
  }
  
  if (!who) throw 'Markiere die Person, die du zum Besitzer machen möchtest!';
  
  let name = await conn.getName(who);
  if (global.owner.some(owner => owner[0] === who.split('@')[0])) throw 'Diese Person ist bereits ein Besitzer!';
  
  global.owner.push([who.split('@')[0], name, true]);
  
  const caption = `Jetzt ist @${who.split('@')[0]} ein Besitzer!`;
  await conn.reply(m.chat, caption, m, {
    mentions: conn.parseMention(caption),
  });
};

handler.help = ['addowner @user'];
handler.tags = ['owner'];
handler.command = /^(add|give|-)(owner|sudo)$/i;
handler.owner = true;

export default handler;