import fetch from 'node-fetch';
let handler = async (m, { conn, text }) => {
	
if (!text) throw `✳️ ${mssg.notext}`;
m.react('💬')

 let syst = `Du bist Rick-Bot, ein großartiges Sprachmodell, das von OpenAI trainiert wurde. Befolge sorgfältig die Anweisungen des Benutzers. Antworte mit Markdown.`
	try {
		let gpt = await fetch(global.API('fgmods', '/api/info/openai', { prompt: syst, text }, 'apikey'));
        let res = await gpt.json()
        await m.reply(res.result, null, rcanal)
	} catch {
		m.reply(`❎ Fehler: Versuche es später erneut`);
	}

}
handler.help = ['ai <text>']; 
handler.tags = ['tools'];
handler.command = ['ia', 'ai', 'chatgpt', 'openai', 'gpt'];

export default handler;
