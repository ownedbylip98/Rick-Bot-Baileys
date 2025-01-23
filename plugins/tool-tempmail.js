import { TempMail } from 'tempmail.lol';

const tempmail = new TempMail();

let handler = async (m, { text, usedPrefix, command }) => {
  if (command === 'tempmail') {
    try {
      const inbox = await tempmail.createInbox();
      const emailMessage = `*Temporäre E-Mail-Adresse:*\n\n${inbox.address}\n\nEin Token zum Überprüfen dieses Postfachs wird in der nächsten Nachricht gesendet. Verwende ihn mit dem .checkmail Befehl.`;
      await m.reply(emailMessage);
      
      // Send the token as a separate, individual message
      await m.reply(inbox.token);

      // Send instructions as a third message
      await m.reply('Lange drücken und den obigen Token kopieren, um ihn mit dem .checkmail Befehl zu verwenden.');

    } catch (error) {
      console.error('Fehler:', error);
      m.reply('Fehler beim Erstellen einer temporären E-Mail-Adresse.');
    }
  } else if (command === 'checkmail') {
    if (!text) {
      m.reply('Bitte gib den Token der temporären E-Mail an, die du überprüfen möchtest.');
      return;
    }

    try {
      const emails = await tempmail.checkInbox(text);
      if (!emails) {
        m.reply(`Keine Nachrichten gefunden oder das Postfach ist abgelaufen.`);
        return;
      }

      if (emails.length === 0) {
        m.reply(`Keine Nachrichten im Postfach gefunden.`);
        return;
      }

      const messages = emails.map(email => {
        return `
*Von:* ${email.from}
*Betreff:* ${email.subject}
*Datum:* ${new Date(email.date).toLocaleString()}
*Nachricht:*
${email.body}
        `;
      }).join('\n\n---\n\n');

      const replyMessage = `*Nachrichten im Postfach:*\n\n${messages}`;
      m.reply(replyMessage);
    } catch (error) {
      console.error('Fehler:', error);
      m.reply(`Fehler beim Überprüfen der Nachrichten.`);
    }
  }
};

handler.help = ['tempmail', 'checkmail <token>'];
handler.tags = ['tools'];
handler.command = ['tempmail', 'checkmail'];
handler.diamond = false;

export default handler;