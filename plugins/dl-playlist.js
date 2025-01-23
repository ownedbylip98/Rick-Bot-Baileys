import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) throw `✳️ Beispiel: *${usedPrefix + command}* Lil Peep hate my life`;
    m.react('📀');
    
    let result = await yts(text);
    let ytres = result.videos;
    
    let listSections = [];
    for (let index in ytres) {
        let v = ytres[index];
        listSections.push({
            title: `${index}┃ ${v.title}`,
            rows: [
                {
                    header: '🎶 MP3',
                    title: "",
                    description: `▢ ⌚ *Dauer:* ${v.timestamp}\n▢ 👀 *Aufrufe:* ${v.views}\n▢ 📌 *Titel:* ${v.title}\n▢ 📆 *Hochgeladen:* ${v.ago}\n`, 
                    id: `${usedPrefix}yta ${v.url}`
                },
                {
                    header: "🎥 MP4",
                    title: "" ,
                    description: `▢ ⌚ *Dauer:* ${v.timestamp}\n▢ 👀 *Aufrufe:* ${v.views}\n▢ 📌 *Titel:* ${v.title}\n▢ 📆 *Hochgeladen:* ${v.ago}\n`, 
                    id: `${usedPrefix}ytv ${v.url}`
                }
            ]
        });
    }

    await conn.sendList(m.chat, '  ≡ *Rick-Bot MUSIC*🔎', `\n 📀 Ergebnisse für:\n *${text}*`, `Klicke hier`, ytres[0].image, listSections, m);
};

handler.help = ['play2'];
handler.tags = ['dl'];
handler.command = ['play2', 'playvid2', 'playlist', 'playlista']; 
handler.disabled = false;

export default handler;
