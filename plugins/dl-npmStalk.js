import pkg from 'api-qasim';
const { npmStalk } = pkg;

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!args[0]) throw `✳️ ${mssg.noUsername}\n\n📌${mssg.example} : ${usedPrefix + command} api-qasim`;

    try {
        await m.react('⏳');
        // Fetching npm package details from API
        let res = await npmStalk(args[0]);

        // Extract relevant data from the API response
        const { name, author, description, repository, homepage, 'dist-tags': distTags, versions } = res.result;

        // Counting the number of versions
        const versionCount = Object.keys(versions).length;

        // Formatting the message with relevant information
        let te = `
┌──「 *STALKING NPM* 
▢ *🔖Name:* ${name} 
▢ *🔖Ersteller:* ${author?.name || 'Unbekannt'}
▢ *👥Gesamtanzahl der Versionen:* ${versionCount}
▢ *📌Beschreibung:* ${description}
▢ *🧩Repository:* ${repository?.url || 'Kein Repository verfügbar'}
▢ *🌍Homepage:* ${homepage || 'Keine Homepage verfügbar'}
▢ *🏷️Dist Tags:* Neueste Version: ${distTags.latest}
▢ *🔗Link:* https://npmjs.com/package/${name}
└────────────`;
        await m.react('✅');
        // Send the text message to the chat
        await conn.sendMessage(m.chat, { text: te }, { quoted: m });
    } catch (error) {
        m.reply(`✳️ ${mssg.error}: ${error}`);
    }
}

handler.help = ['npm', 'npmstalk'];
handler.tags = ['dl'];
handler.command = ['npm', 'npmstalk'];

export default handler;
