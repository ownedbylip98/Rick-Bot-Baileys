import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("Gib den Namen der App ein, nach der du im Play Store suchen möchtest.");
  }

  try {
    // Add "wait" reaction to indicate the request is processing
    await m.react('⏳');
    
    // Fetch data from the Play Store API
    const response = await fetch(`https://ownedbylip-api.vercel.app/playstore?query=${text}`);
    
    // Log the API response to the console for debugging
    const data = await response.json();
    console.log("Play Store API Antwort:", data);

    // Check if the API returned results
    if (!data || data.length === 0) {
      // React with "done" emoji in case no results
      await m.react('✅');
      return m.reply("Es wurden keine Apps im Play Store für die gesuchte Anwendung gefunden.");
    }

    let caption = `Play Store Suchergebnisse für *${text}*:\n\n`;

    // Loop through the results and format the response
    data.forEach((result, index) => {
      if (result.name && result.link && result.developer && result.rating_Num) {
        caption += `
${index + 1}. *Titel:* ${result.name}
*Entwickler:* ${result.developer}
*Bewertung:* ${result.rating_Num} Sterne
*Download-Link:* ${result.link}
*Entwicklerseite:* ${result.link_dev || 'Nicht verfügbar'}
\n`;
      }
    });

    // React with "done" emoji after the process is complete
    await m.react('✅');
    
    // Send the formatted message with app details
    await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
  } catch (error) {
    console.error("Fehler bei der Play Store Suche:", error);
    m.reply("Bei der Suche nach Apps im Play Store ist ein Fehler aufgetreten.");
  }
};

handler.help = ['playstore'];
handler.tags = ['search'];
handler.command = /^(playstore)$/i;
handler.group = false;

export default handler;
