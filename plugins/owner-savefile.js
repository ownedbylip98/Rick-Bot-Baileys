import fs from 'fs' 
let handler = async (m, { text, usedPrefix, command }) => { 
  if (!text) throw `uhm.. wo ist der Text?\n\nVerwendung:\n${usedPrefix + command} <Text>\n\nBeispiel:\n${usedPrefix + command} plugins/xei-sensei.js` 
  if (!m.quoted.text) throw `Antworte auf die Nachricht!` 
  let path = `${text}` 
  await fs.writeFileSync(path, m.quoted.text) 
  m.reply(`gespeichert in ${path}`) 
} 
handler.help = ['sf'].map(v => v + ' <texte>') 
handler.tags = ['eigentümer'] 
handler.command = /^sf|savefile|addplugin$/i 

handler.rowner = true 
export default handler
