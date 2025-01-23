import fetch from 'node-fetch'
let handler = async (m, {
    text,
    command,
    usedPrefix,
    conn
}) => {

var suggest = `Gib den Befehl zusammen mit dem Prompt ein 🥺`
if (!text) throw suggest
try {
    let res = await(await fetch('https://lexica.art/api/v1/search?q=' + text)).json()
    let randm = res.images
    let resul = randm.getRandom()
    await m.reply(wait)
    let maker = "*Generiert von Lexica*"; // Füge diese Zeile hinzu, bevor du 'maker' verwendest
    
    await conn.sendFile(m.chat, 
    resul.src, text, maker + "\n*Kreativ:* " + resul.prompt + '\n\n https://whatsapp.com/channel/0029VagJIAr3bbVBCpEkAM07', m)
    } catch (e) {
    throw e
    }
}
handler.help = ["lexica"]
handler.tags = ['ai']
handler.command = ["lexica"]

export default handler
