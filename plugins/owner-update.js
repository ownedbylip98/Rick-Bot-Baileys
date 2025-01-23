import db from '../lib/database.js';
import { execSync } from 'child_process';
import fs from 'fs';

let handler = async (m, { conn, text }) => {
  // Stelle sicher, dass der Befehl vom Besitzer ausgeführt wird
  if (conn.user.jid == conn.user.jid) {
    // Führe den git pull Befehl aus
    let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''));
    // Lade alle Plugins neu
    fs.readdirSync('plugins').forEach(v => global.reload('', v));
    // Antworte mit der Ausgabe des git Befehls
    conn.reply(m.chat, stdout.toString(), m);
  }
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update', 'aktualisieren', 'fix', 'fixed'];
handler.rowner = true;

export default handler;
