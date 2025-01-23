let handler = async (m, {
    conn,
    groupMetadata,
    usedPrefix,
    text,
    command
}) => {
    if (!text && !m.quoted) return m.reply("Wo sind die Infos?")
    let get = await groupMetadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
    let count = get.length;
    let sentCount = 0;
    m.reply(wait);
    for (let i = 0; i < get.length; i++) {
        setTimeout(function() {
            if (text) {
                conn.sendMessage(get[i], {
                    text: text
                });
            } else if (m.quoted) {
                conn.copyNForward(get[i], m.getQuotedObj(), false);
            } else if (text && m.quoted) {
                conn.sendMessage(get[i], {
                    text: text + "\n" + m.quoted.text + "\n\nWerbung von Qasim"
                });
            }
            count--;
            sentCount++;
            if (count === 0) {
                m.reply(`Benachrichtigung erfolgreich an alle Gruppenmitglieder gesendet ✅.

👨‍🎓 *Operator:* ${author}
🤖 *Sender:* Rick-Bot
✅ *Gesamt:* ${sentCount} Benutzer benachrichtigt`);
            }
        }, i * 5000); // delay each transmission for 5 second
    }
}

handler.help = ['pushcontact', 'ads', 'promote']
handler.tags = ['owner']
handler.command = /^(pushcontact|ads|promote)$/i
handler.owner = true
handler.group = true

export default handler