import pkg from '@whiskeysockets/baileys';
const { proto, prepareWAMessageMedia, generateWAMessageFromContent } = pkg;
import moment from 'moment-timezone';
import { createHash } from 'crypto';
import { xpRange } from '../lib/levelling.js';

let handler = async (m, { conn, usedPrefix }) => {
    let d = new Date(new Date() + 3600000);
    let locale = 'en';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);

    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    if (!(who in global.db.data.users)) throw `✳️ Der Benutzer wurde nicht in meiner Datenbank gefunden`;

    let user = global.db.data.users[who];
    let { level } = user;
    let { min, xp, max } = xpRange(level, global.multiplier);
    let greeting = ucapan();

    let str = `
      『 *Rick-Bot* 』  
      © 2025 *OwnedbyLIP*`;

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: str
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: "Use The Below Buttons"
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({ image: { url: './assets/A.jpg' } }, { upload: conn.waUploadToServer })),
                        title: null,
                        subtitle: null,
                        hasMediaAttachment: false
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                "name": "single_select",
                                "buttonParamsJson": JSON.stringify({
                                    "title": "TAP TO OPEN",
                                    "sections": [{
                                        "title": "HIER IST DAS BUTTONS-MENÜ",
                                        "highlight_label": "ULTRA",
                                        "rows": [
                                            { "header": "", "title": "🎁 Bot-Menü", "description": "Das geheime Kontrollpanel des Bots.", "id": `${usedPrefix}botmenu` },
                                            { "header": "", "title": "🖲️ Besitzer-Menü", "description": "Ja, das ist für dich, Boss!", "id": `${usedPrefix}ownermenu` },
                                            { "header": "", "title": "🎉 AI-Menü", "description": "Deine persönlichen künstlichen Intelligenz-Copiloten", "id": `${usedPrefix}aimenu` },
                                            { "header": "", "title": "🎧 Audio-Menü", "description": "Passe die Mp3/Audio nach Belieben an", "id": `${usedPrefix}aeditor` },
                                            { "header": "", "title": "🍫 Anime-Menü", "description": "Animierte Bilder, Sticker und Videos", "id": `${usedPrefix}animemenu` },
                                            { "header": "", "title": "🪁 Anime-Info", "description": "Vollständige Informationen über Animes wie IMDB", "id": `${usedPrefix}infoanime` },
                                            { "header": "", "title": "🛫 Gruppen-Menü", "description": "Zentrale für Gruppenscherze!", "id": `${usedPrefix}groupmenu` },
                                            { "header": "", "title": "🗂️ Download-Menü", "description": "'DL' steht für 'Delicious Loot'.", "id": `${usedPrefix}dlmenu` },
                                            { "header": "", "title": "🎭 Spaß-Menü", "description": "Der Partyhut des Bots. Spiele, Witze und sofortige ROFLs.", "id": `${usedPrefix}funmenu` },
                                            { "header": "", "title": "💵 Wirtschafts-Menü", "description": "Dein persönlicher Tresor der virtuellen Wirtschaft.", "id": `${usedPrefix}economymenu` },
                                            { "header": "", "title": "🎮 Spiele-Menü", "description": "Betritt die Gaming-Arena.", "id": `${usedPrefix}gamemenu` },
                                            { "header": "", "title": "🫐 Sticker-Menü", "description": "Ein Regenbogen von Stickern.", "id": `${usedPrefix}stickermenu` },
                                            { "header": "", "title": "🖍️ Fancy Text", "description": "Fancy Text Generator.", "id": `${usedPrefix}fancy` },
                                            { "header": "", "title": "🎊 Werkzeug-Menü", "description": "Dein praktischer Werkzeugkasten.", "id": `${usedPrefix}toolmenu` },
                                            { "header": "", "title": "🏵️ Logo-Menü", "description": "Erstelle ein Logo, das dich repräsentiert.", "id": `${usedPrefix}logomenu` },
                                            { "header": "", "title": "🖌️ Fancy Text2", "description": "Von Text zu Fancy Text als jpg", "id": `${usedPrefix}fancy2` },
                                            { "header": "", "title": "🌄 NSFW-Menü", "description": "Das After Dark-Menü.", "id": `${usedPrefix}nsfwmenu` }
                                        ]
                                    }]
                                })
                            },
                            {
                                "name": "quick_reply",
                                "buttonParamsJson": JSON.stringify({
                                    "display_text": "MENÜ2 ❇️",
                                    "id": `${usedPrefix}menu2`
                                })
                            },
                            {
                                "name": "cta_url",
                                "buttonParamsJson": JSON.stringify({
                                    "display_text": "BESITZER 🌟",
                                    "url": "https://wa.me/491624542167"
                                })
                            },
                            {
                                "name": "cta_url",
                                "buttonParamsJson": JSON.stringify({
                                    "display_text": "SCRIPT 💕",
                                    "url": "https://github.com/OwnedbyLIP/Rick-Bot"
                                })
                            }
                        ],
                    })
                })
            }
        }
    }, {});

    await conn.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    });
}

handler.help = ['main'];
handler.tags = ['group'];
handler.command = ['menu2', 'help2', 'h', 'commands2'];

export default handler;

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

function ucapan() {
    const time = moment.tz('Europe/Berlin').format('HH');
    let res = "fröhlichen frühen Tag☀️";
    if (time >= 6) {
        res = "Guten Morgen 🥱";
    }
    if (time >= 12) {
        res = "Guten Tag🫠";
    }
    if (time >= 18) {
        res = "Guten Abend 🌇";
    }
    if (time >= 24) {
        res = "Gute Nacht 🌙";
    }
    return res;
}
