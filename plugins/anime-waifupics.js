import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  m.react(rwait);

  let type = (command).toLowerCase();
  let baseUrl = 'https://weeb-api.vercel.app/';

  const fetchImage = async (endpoint) => {
    try {
      const response = await fetch(baseUrl + endpoint);
      if (!response.ok) throw `❎ Fehler beim Abrufen des ${type} Bildes`;
      const imageBuffer = await response.buffer(); // Bilddaten als Puffer abrufen
      conn.sendFile(m.chat, imageBuffer, 'img.jpg', `✅ Zufälliges ${type}`, m);
      m.react('😁');
    } catch (error) {
      console.error(error);
      m.reply(`❎ Ein Fehler ist aufgetreten beim Abrufen des ${type} Bildes.`);
    }
  };

  switch (type) {
    case 'loli':
      fetchImage('loli');
      break;

    case 'waifu':
      fetchImage('waifu');
      break;

    case 'neko':
      fetchImage('neko');
      break;

    case 'zerotwo':
      fetchImage('zerotwo');
      break;

    default:
      
      break;
  }
};

handler.help = ['waifu', 'neko', 'zerotwo', 'loli']
handler.tags = ['anime']
handler.command = ['waifu', 'neko', 'zerotwo', 'loli'] 


export default handler
