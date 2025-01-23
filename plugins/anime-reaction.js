import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let wer;
  if (m.isGroup) {
    wer = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  } else {
    wer = m.chat;
  }

  if (!wer) throw `✳️ Markiere oder erwähne jemanden\n\n📌 Beispiel: ${usedPrefix + command} @tag`;

  let name = conn.getName(wer);
  let name2 = conn.getName(m.sender);
  m.react(rwait);

  let reaction = await fetch(`https://api.waifu.pics/sfw/${command}`);
  if (!reaction.ok) throw await reaction.text();
  
  let json = await reaction.json();
  let { url } = json;

  conn.sendMessage(m.chat, { video: { url: url }, gifPlayback: true, caption: `(${name2}) ${command} ${name}`, mentions: [m.sender] }, { quoted: m })

  m.react('☺️'); 
}

handler.tags = ['reaction'];
handler.help = [
  'mobben @tag',
  'kuscheln @tag',
  'weinen @tag',
  'umarmen @tag',
  'awoo @tag',
  'küss @tag',
  'lecken @tag',
  'tätscheln @tag',
  'selbstgefällig @tag',
  'bonk @tag',
  'yeet @tag',
  'erröten @tag',
  'lächeln @tag',
  'winken @tag',
  'highfive @tag',
  'handhalten @tag',
  'nom @tag',
  'beißen @tag',
  'glomp @tag',
  'ohrfeige @tag',
  'töten @tag',
  'glücklich @tag',
  'zwinkern @tag',
  'stupsen @tag',
  'tanzen @tag',
  'cringe @tag'
];

handler.command = /^(mobben|kuscheln|weinen|umarmen|awoo|kuss|lecken|pat|smug|bonk|yeet|blush|smile|wave|highfive|handhold|nom|bite|glomp|slap|kill|happy|wink|poke|dance|cringe)$/i;
handler.group = true;

export default handler;
