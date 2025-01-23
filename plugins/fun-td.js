import axios from 'axios';

let handler = async (m, { conn, command }) => {
  try {
    if (command === 'td') {
      const message = handler.help.join('\n');
      conn.sendMessage(m.chat, { text: message }, { quoted: m });
      return;
    }

    if (command.toLowerCase() === 'dare') {
      const dareQuestion = await fetchDareQuestion();
      const message = formatMessage(dareQuestion);
      conn.sendMessage(m.chat, { text: message }, { quoted: m });
      return;
    }

    const baseURL = 'https://api.truthordarebot.xyz/api/';

    // endpoint based on the command
    let endpoint;
    switch (command.toLowerCase()) {
      case 'truth':
        endpoint = 'truth';
        break;
      case 'wyr':
      case 'wouldyourather':
        endpoint = 'wyr';
        break;
      case 'nhie':
      case 'neverhaveiever':
        endpoint = 'nhie';
        break;
      case 'paranoia':
        endpoint = 'paranoia';
        break;
      default:
        throw new Error('Ungültiger Befehl. Bitte gib einen der folgenden Befehle an: !truth, !dare, !wyr, !nhie, !paranoia');
    }

    const question = await fetchWithRetry(`${baseURL}${endpoint}`);
    const message = formatMessage(question);
    conn.sendMessage(m.chat, { text: message }, { quoted: m });

  } catch (error) {
    console.error('Fehler beim Verarbeiten des Truth or Dare-Befehls:', error);
    throw new Error('Fehler beim Abrufen der Truth or Dare-Frage. Bitte versuche es später noch einmal.');
  }
};

const fetchDareQuestion = async () => {
  const dareURL = 'https://api.truthordarebot.xyz/api/dare';
  try {
    const response = await axios.get(dareURL);
    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Dare-Frage:', error);
    throw new Error('Fehler beim Abrufen der Dare-Frage. Bitte versuche es später noch einmal.');
  }
};

const fetchWithRetry = async (url, maxRetries = 3) => {
  let retryCount = 0;
  while (retryCount < maxRetries) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      retryCount++;
      console.error(`Versuch ${retryCount} fehlgeschlagen: ${error.message}`);
      if (retryCount < maxRetries) {
        console.log(`Erneuter Versuch (${retryCount}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Warte 3 Sekunden vor erneutem Versuch
      } else {
        throw new Error(`Fehlgeschlagen nach ${retryCount} Versuchen: ${error.message}`);
      }
    }
  }
};

const formatMessage = (question) => {
  return `Typ: ${question.type.toUpperCase()}\n${question.question}`;
};

handler.command = /^(truth|dare|wyr|wouldyourather|nhie|neverhaveiever|paranoia|td)$/i;
handler.group = true;
// td -> list of commands that is in handler.help
handler.help = [
  'truth - Erhalte eine zufällige Wahrheit-Frage.',
  'dare - Erhalte eine zufällige Dare-Frage.',
  'wyr - Erhalte eine zufällige "Würdest du eher"-Frage.',
  'nhie - Erhalte eine zufällige "Ich habe noch nie"-Frage.',
  'paranoia - Erhalte eine zufällige Paranoia-Frage.',
  'td - Liste alle verfügbaren Truth or Dare-Befehle auf.'
];

export default handler;

