let handler = async (m, { text, usedPrefix, command }) => {
    global.db.data.sticker = global.db.data.sticker || {};
    
    // Stelle sicher, dass m.quoted definiert ist und fileSha256 hat
    if (!m.quoted) throw `✳️ Zitierte Nachricht nicht gefunden`;
    if (!m.quoted.fileSha256) throw `⚠️ Datei SHA256 nicht gefunden`;
    if (!text) throw `✳️ Befehl fehlt`;

    let sticker = global.db.data.sticker;
    let hash = m.quoted.fileSha256.toString('base64');

    // Überprüfe, ob der Sticker gesperrt ist
    if (sticker[hash] && sticker[hash].locked) {
        throw '⚠️ Du hast keine Berechtigung, diesen Sticker-Befehl zu ändern';
    }

    // Sticker-Eigenschaften zuweisen
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid || [], // Stelle sicher, dass es definiert ist
        creator: m.sender,
        at: +new Date(),
        locked: false,
    };

    m.reply(`✅ Befehl erfolgreich gespeichert.`);
}

handler.help = ['setcmd <text>'];
handler.tags = ['cmd'];
handler.command = ['setcmd'];
handler.rowner = true;

export default handler;
