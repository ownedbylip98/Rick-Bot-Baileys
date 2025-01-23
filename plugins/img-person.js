let handler = async(m, { conn, usedPrefix, command }) => {
	m.react(rwait)
	
	let res = await conn.getFile(global.API('fgmods', '/api/img/ai-face', { }, 'apikey'))
	let img = res.data
        await conn.sendFile(m.chat, img, 'img.jpg', `✅ Diese Person existiert nicht, sie wurde mit KI generiert`, m) 
	m.react(done) 
}
handler.help = ['person']
handler.tags = ['img']
handler.command = ['persona', 'person']

export default handler
