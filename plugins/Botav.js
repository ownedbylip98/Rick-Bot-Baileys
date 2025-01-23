let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  let name = conn.getName(m.sender);
  let taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
  let av = `./assets/${pickRandom(['qasim', 'global'])}.mp3`;

  conn.sendButton(m.chat, `*HALLO VOM RICK-BOT GLOBAL*\n        Morgen oder Abend\n\n @${m.sender.split('@')[0]}     \n\n*Du hast mich gerufen, was ist dein Problem, Bro?* `.trim(), igfg, null, [['OWNER HILFE', '.grp'], ['GET SC', '.repo']], m, { mentions: [m.sender] });
  conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true });
}

handler.customPrefix = /^(bot)$/i;
handler.command = new RegExp();
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
