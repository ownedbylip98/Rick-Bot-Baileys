import fetch from 'node-fetch';
let handler = async (m, { conn, text }) => {
	
if (!text) throw `✳️ ${mssg.notext}`;
m.react('💬')

    try {
		let gpt = await fetch(global.API('fgmods', '/api/info/gemini', { text }, 'apikey'));
        let res = await gpt.json()
        await m.reply(res.result)
	} catch {
		m.reply(`❎ Fehler: Versuche es später noch einmal`);
	}

}
handler.help = ['gemini <text>']; 
handler.tags = ['werkzeuge'];
handler.command = ['gemini'];

export default handler;
