import pkg from 'api-qasim';
const { tiktokStalk } = pkg;

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!args[0]) throw `✳️ ${mssg.noUsername}\n\n📌${mssg.example} : ${usedPrefix + command} discoverpakistantv`;

    try {
        await m.react('⏳');
        // Abrufen der TikTok-Benutzerdetails von der API
        let res = await tiktokStalk(args[0]);

        // Extrahieren relevanter Daten aus der API-Antwort
        const { name, username, followers, following, description, profilePic } = res.obj;

        // Formatieren der Nachricht mit relevanten Informationen
        let te = `
┌──「 *STALKING TIKTOK* 
▢ *🔖Name:* ${username || 'Kein Benutzername'}
▢ *🔖Benutzername:* ${name || 'Unbekannt'}
▢ *👥Follower:* ${followers || 'N/A'}
▢ *🫂Folge ich:* ${following || 'N/A'}
▢ *📌Bio:* ${description || 'Keine Bio verfügbar'}
▢ *🔗Link:* https://www.tiktok.com/@${name.replace(/^@/, '') || 'KeinBenutzername'}
└────────────`;

        // Behandle profilePic: Wenn es fehlt, verwende ein Standardbild
        const imageToSend = profilePic || 'https://upload.wikimedia.org/wikipedia/commons/8/85/TikTok_logo_2018.svg';
        await m.react('✅');

        // Sende die formatierte Nachricht und das Profilbild (oder Standardbild)
        await conn.sendFile(m.chat, imageToSend, 'tt.png', te, m);
    } catch (error) {
        m.reply(`✳️ ${mssg.error}: ${error.message || error}`);
    }
}

handler.help = ['ttstalk', 'tiktokstalk'];
handler.tags = ['dl'];
handler.command = ['ttstalk', 'tiktokstalk'];

export default handler;
