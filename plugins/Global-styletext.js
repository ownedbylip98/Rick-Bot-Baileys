import fs from 'fs';
import path from 'path';

// Load styles from fancyStyles.json
const stylesFile = path.resolve('src/font/fancyStyles.json');
const styles = JSON.parse(fs.readFileSync(stylesFile)).styles;

async function handler(m, { args }) {
    // If no style number is provided, display available styles
    if (!args[0]) {
        let styleList = styles.map((style, index) => `${index + 1}. ${style.styleName || 'Stil ' + (index + 1)}`).join('\n');
        await m.reply(`Bitte wähle eine Stilnummer:\n\n${styleList}\n\nVerwendung: .fancy <stil_nummer> <text>`);
        return;
    }

    // Parse style number and validate it
    const styleNumber = parseInt(args[0]);
    if (isNaN(styleNumber) || styleNumber < 1 || styleNumber > styles.length) {
        await m.reply(`Ungültige Stilnummer. Wähle eine Nummer zwischen 1 und ${styles.length}.`);
        return;
    }

    // Extract the text to style
    const textToStyle = args.slice(1).join(' ');
    if (!textToStyle) {
        await m.reply('Bitte gib den Text ein, den du stylen möchtest.');
        return;
    }

    // Get the selected style map
    const selectedStyleMap = styles[styleNumber - 1];

    // Convert text by replacing each character with the stylized version from selected style map
    const styledText = textToStyle
        .split('')
        .map((char) => selectedStyleMap[char] || char) // Fallback to original if no match
        .join('');

    // Send the styled text
    await m.reply(styledText);
}

handler.help = ['fancy'];
handler.tags = ['tools'];
handler.command = /^fancy$/i;

export default handler;
