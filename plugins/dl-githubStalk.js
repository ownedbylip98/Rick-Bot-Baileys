import pkg from 'api-qasim';
const { githubStalk } = pkg;

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!args[0]) throw `✳️ ${mssg.noUsername}\n\n📌${mssg.example} : ${usedPrefix + command} GlobalTechInfo`;

    try {
        await m.react('⏳');
        // Fetching the GitHub details of the user
        let res = await githubStalk(args[0]);

        // Extracting relevant data from the API response
        const {
            username,
            nickname,
            bio,
            profile_pic,
            url,
            company,
            location,
            blog,
            followers,
            following,
            public_repo,
            public_gists,
            created_at,
            updated_at
        } = res.results;

        // Formatting the message with relevant information
        let te = `
┌──「 *STALKING GITHUB* 
▢ *🔖Name:* ${nickname || 'Unbekannt'}
▢ *🔖Benutzername:* ${username}
▢ *👥Follower:* ${followers || 'N/A'}
▢ *🫂Folge ich:* ${following || 'N/A'}
▢ *📌Bio:* ${bio || 'Keine Bio verfügbar'}
▢ *🏝️Öffentliche Repos:* ${public_repo || 'N/A'}
▢ *📚Öffentliche Gists:* ${public_gists || 'N/A'}
▢ *🧳Ort:* ${location || 'Unbekannt'}
▢ *🏢Firma:* ${company || 'Keine Firmeninfo'}
▢ *🔗Link:* ${url || 'Kein URL verfügbar'}
└────────────`;

        // Send the message with the profile image
        const imageToSend = profile_pic || 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
        await m.react('✅');
        await conn.sendFile(m.chat, imageToSend, 'GitHubProfile.jpg', te, m);
    } catch (error) {
        m.reply(`✳️ ${mssg.error}: ${error}`);
    }
}

handler.help = ['gstalk', 'githubstalk'];
handler.tags = ['dl'];
handler.command = ['gstalk', 'githubstalk'];

export default handler;
