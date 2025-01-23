import pkg from 'api-qasim';
const { trendtwit } = pkg;

let handler = async (m, { text, command, usedPrefix, conn }) => {
    var suggest = `Bitte gib einen Ländernamen an. Beispiel: *${usedPrefix}${command} Pakistan*`;
    if (!text) throw suggest;

    try {
        await m.react('⌛');

        console.log(`Abrufen der Trends für das Land: ${text}`);

        // Fetch the trending topics using the trendtwit function
        let trendtwitResult = await trendtwit(text);

        // Check if trendtwitResult is a valid string or object
        if (typeof trendtwitResult === 'string') {
            // Send a string message properly formatted
            let data = {
                text: `*Trendthemen in ${text}:*\n\n${trendtwitResult}`,
            };
            await conn.sendMessage(m.chat, data, { quoted: m });
        } else if (trendtwitResult && typeof trendtwitResult === 'object' && trendtwitResult.result && Array.isArray(trendtwitResult.result) && trendtwitResult.result.length > 0) {
            // Handle it if the result is an object with trends
            let trends = trendtwitResult.result.map((trend, index) => {
                if (trend.hastag && trend.tweet) {
                    return `${index + 1}. ${trend.hastag} - ${trend.tweet}`;
                } else {
                    console.warn(`Unerwartetes Trendformat bei Index ${index}:`, trend);
                    return `Ungültiges Trendformat bei Index ${index}`;
                }
            }).join('\n');

            let data = {
                text: `*Trendthemen in ${text}:*\n\n${trends}\n\n*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 © Rick-Bot*`,
            };
            await conn.sendMessage(m.chat, data, { quoted: m });
            m.react('✅');
        } else {
            // Handle case where there are no valid trends
            throw "Keine Trenddaten für dieses Land gefunden.";
        }

    } catch (e) {
        // Log the error message for debugging
        console.error('Fehler:', e);

        // Ensure error message is safely handled
        const errorMessage = e.message || e || "Unbekannter Fehler aufgetreten.";
        throw `Ein Fehler ist aufgetreten: ${errorMessage}`;
    }
}

handler.help = ['trendtwit', 'trends', 'trendingtags', 'tweets', 'hashtags', 'trendtags'];
handler.tags = ['social'];
handler.command = ['trendtwit', 'trends', 'trendingtags', 'tweets', 'hashtags', 'trendtags'];

export default handler;
