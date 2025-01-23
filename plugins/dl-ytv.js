import fetch from 'node-fetch';
import pkg from 'api-qasim';
const { ytmp4 } = pkg;

const fetchWithRetry = async (url, options, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        const response = await fetch(url, options);
        if (response.ok) return response;
        console.log(`Erneuter Versuch... (${i + 1})`);
    }
    throw new Error('Fehler beim Abrufen des Medieninhalts nach mehreren Versuchen');
};

const handler = async (m, { args, conn, usedprefix }) => {
    // Check if a URL was provided
    if (!args.length) {
        await m.reply('Bitte gib eine YouTube-URL an.');
        return;
    }

    const url = args.join(' '); // Join arguments to handle spaces in URLs
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

    // Validate the URL format
    if (!youtubeRegex.test(url)) {
        await m.react('❌'); // React with a cross emoji for invalid URL
        await m.reply('Ungültige YouTube-URL. Bitte gib eine gültige URL an.');
        return;
    }

    await m.react('⏳'); // React with a loading emoji

    try {
        // Fetch video details with ytdown
        const response = await ytmp4(url);
        
        // Check if response is valid and contains 'video' field
        if (!response || !response.video) {
            console.error('Ungültige Antwortstruktur:', response); // Log invalid response for better debugging
            throw new Error('Ungültige Antwort vom Downloader.');
        }

        const videoUrl = response.video; // Use the 'video' key for the URL
        if (!videoUrl) {
            throw new Error('Video-URL nicht gefunden.');
        }

        const title = response.title || 'video';
        const author = response.author || 'Unbekannter Autor';
        const duration = response.duration || 'N/A';
        const views = response.views || '0';
        const uploadDate = response.upload || 'Unbekanntes Datum';
        const thumbnail = response.thumbnail || '';
        
        const caption = `*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 © 𝚁𝚒𝚌𝚔-𝙱𝚘𝚝*\n\n` +
                        `*Titel:* ${title}\n` +
                        `*Autor:* ${author}\n` +
                        `*Dauer:* ${duration}\n` +
                        `*Aufrufe:* ${views}\n` +
                        `*Hochgeladen am:* ${uploadDate}`;

        // Fetch the video file with retry
        const mediaResponse = await fetchWithRetry(videoUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
                'Accept': 'application/json, text/plain, */*'
            }
        });

        const contentType = mediaResponse.headers.get('content-type');
        if (!contentType || !contentType.includes('video')) {
            throw new Error('Ungültiger Inhaltstyp empfangen');
        }

        const arrayBuffer = await mediaResponse.arrayBuffer();
        const mediaBuffer = Buffer.from(arrayBuffer);
        if (mediaBuffer.length === 0) throw new Error('Heruntergeladene Datei ist leer');

        // Send the video file along with the caption
        await conn.sendFile(m.chat, mediaBuffer, `null`, caption, m, false, {
            mimetype: 'video/mp4',
            thumbnail: thumbnail
        });

        await m.react('✅'); // React with a checkmark emoji for success
    } catch (error) {
        console.error('Fehler beim Abrufen des Videos:', error.message, error.stack);
        await m.reply('Ein Fehler ist beim Abrufen des Videos aufgetreten. Bitte versuche es später erneut.');
        await m.react('❌'); // React with a cross emoji for errors
    }
};

handler.help = ['ytmp4', 'ytv'];
handler.tags = ['dl'];
handler.command = ['ytmp4', 'ytv'];

export default handler;
