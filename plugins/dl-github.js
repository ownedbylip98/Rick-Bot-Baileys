let handler = async (m, { args, usedPrefix, command }) => {
    // Check if the username (args[0]) is provided
    if (!args[0]) {
        return m.reply('Benutzername und Repository-Name fehlen. Beispiel: GlobalTechInfo ULTRA-MD');
    }

    // Check if the repository (args[1]) is provided
    if (!args[1]) {
        return m.reply('Repository-Name fehlt. Beispiel: ULTRA-MD');
    }

    // Construct the GitHub URL for the repository zip file
    let url = `https://github.com/${args[0]}/${args[1]}/archive/refs/heads/main.zip`;

    // Inform the user that the zip file is being processed
    m.reply('Warte darauf, dass das Repository in eine Zip-Datei komprimiert wird...');

    try {
        // Send the file to the user
        conn.sendFile(m.chat, url, `${args[1]}.zip`, null, m);
    } catch (e) {
        // Handle any potential errors during the file send operation
        console.error(e);
        m.reply('Fehler beim Abrufen des Repositorys. Bitte stelle sicher, dass das Repository existiert und versuche es erneut.');
    }
};

// Metadata for the handler
handler.help = ['github', 'githubdl'];
handler.tags = ['github'];
handler.command = ['github', 'githubdl'];

// Export the handler
export default handler;
