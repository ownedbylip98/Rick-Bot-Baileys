import fs from 'fs/promises';
import path from 'path';

let handler = async (m, { text, usedPrefix, command, __dirname }) => {
  if (!text) {
    m.reply(`Verwendung: ${usedPrefix + command} <Dateiname>\n❇️ Beispiel:\n${usedPrefix}getfile main.js`);
    return;
  }
  
  const filePath = path.join(__dirname, text);
  try {
    await fs.access(filePath); // Check if file exists
    const fileContent = await fs.readFile(filePath, 'utf8');
    m.reply(fileContent);
  } catch (e) {
    if (e.code === 'ENOENT') {
      m.reply(`❌ Fehler: Keine Datei mit dem Namen "${text}" gefunden.`);
    } else {
      console.error(e);
      m.reply(`❌ Fehler: ${e.message}`);
    }
  }
}

handler.help = ['getfile <Dateiname>'];
handler.tags = ['eigentümer'];
handler.command = ['getfile'];
handler.rowner = true;

export default handler;
