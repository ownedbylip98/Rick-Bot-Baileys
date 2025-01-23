import pkg from 'api-qasim'
const { igStalk } = pkg;

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!args[0]) throw `✳️ Kein Benutzername angegeben\n\n📌Beispiel: ${usedPrefix + command} truepakistanofficial`; 

    try {
        await m.react('⏳');
        let res = await igStalk(args[0]);

        let te = `
┌──「 *STALKING IG* 
▢ *🔖Name:* ${res.name} 
▢ *🔖Benutzername:* ${res.username}
▢ *👥Follower:* ${res.followers}
▢ *🫂Folgt:* ${res.following}
▢ *📌Bio:* ${res.description}
▢ *🏝️Beiträge:* ${res.posts}
▢ *🔗Link:* https://instagram.com/${res.username.replace(/^@/, '')}
└────────────`;
        await m.react('✅');
        await conn.sendFile(m.chat, res.profilePic, 'tt.png', te, m);
    } catch (error) {
        m.reply(`✳️ ${error}`);
    }
}

handler.help = ['igstalk'];
handler.tags = ['dl'];
handler.command = ['igstalk'];

export default handler;
