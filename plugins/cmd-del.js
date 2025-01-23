//import db from '../lib/database.js'

let handler = async (m, { text }) => {
  let hash = text;
  
  // Check if a quoted message exists and get its hash if available
  if (m.quoted && m.quoted.fileSha256) {
    hash = m.quoted.fileSha256.toString('hex');
  }
  
  // Ensure a hash is provided
  if (!hash) throw `✳️ Bitte gib den Befehl ein.`;
  
  let sticker = global.db.data.sticker;

  // Check if the command is locked
  if (sticker[hash] && sticker[hash].locked) {
    throw `✳️ Du kannst diesen Befehl nicht löschen.`;
  }
  
  // Delete the sticker command
  delete sticker[hash];
  
  // Confirm deletion
  m.reply(`✅ Befehl gelöscht.`);
}

handler.help = ['cmd'].map(v => 'del' + v + ' <text>');
handler.tags = ['cmd'];
handler.command = ['delcmd'];
handler.owner = true;

export default handler;
