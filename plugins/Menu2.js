import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import fs from 'fs'
const { levelling } = '../lib/levelling.js'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'
const time = moment.tz('Europe/Berlin').format('HH')
let wib = moment.tz('Europe/Berlin').format('HH:mm:ss')
//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command}) => {
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `✳️ Der Benutzer wurde nicht in meiner Datenbank gefunden`
let pp = './assets/A.jpg'
let user = global.db.data.users[who]
let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)
let username = conn.getName(who)
let math = max - xp
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let totaluser = Object.values(global.db.data.users).length 
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850) 
let greeting = ucapan()
let quote = quotes[Math.floor(Math.random() * quotes.length)];

let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let str = `
🚀 *_Schnall dich an ${name}, ${greeting}! Wir gehen auf ein Abenteuer!_* 🚀

📋 *_Zitat des Tages: ${quote}_* 📋
> ➠ *Bot Name* : *Rick-Bot*
> ➠ *Version*     : *4 . 0 . 0*
> ➠ *Type*          : *PLUGINS*
> ➠ *Platform*   : *LINUX*

◈┏━⟪ *MENU* ⟫━━⦿
◈┃• groupmenu
◈┃• animemenu
◈┃• autoreact
◈┃• infoanime
◈┃• makermenu
◈┃• ownermenu
◈┃• stickermenu
◈┃• toolsmenu
◈┃• gamesmenu
◈┃• logomenu
◈┃• listplugin
◈┃• economy
◈┃• reactions
◈┃• funmenu
◈┃• nsfwmenu
◈┃• randompic
◈┃• randomvid
◈┃• setprivacy
◈┃• botmenu
◈┃• listmenu
◈┃• dlmenu
◈┃• enable
◈┃• aimenu
◈┃• aeditor
◈┃• imagen
◈┃• textpro
◈┃• menu
◈┃• menu3
◈┃• menu4
◈┃• fancy
◈┗━♪♪━★━☆━⦿

© OwnedbyLIP

> 💡 *_Denke daran, wenn du Zweifel hast, benutze ${usedPrefix}listmenu oder ${usedPrefix}help Es ist wie mein Zauberbuch!_* 💡
`

    

       // await conn.sendMessage(m.chat, { video: { url: [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15].getRandom() }, gifPlayback: true, caption: text.trim(), mentions: [m.sender] }, { quoted: estilo })
    


   conn.sendFile(m.chat, pp, 'profil.jpg', str, m, null, kanal)
    m.react(done)

}
handler.help = ['main']
handler.tags = ['group']
handler.command = ['menu', 'help'] 

export default handler
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
    
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

    const quotes = [
      "Ich bin nicht faul, ich bin nur im Energiesparmodus.",
      "Das Leben ist kurz, lächle, solange du noch Zähne hast.",
      "Ich mag ein schlechter Einfluss sein, aber verdammt, ich bin lustig!",
      "Ich bin auf einer Whisky-Diät. Ich habe schon drei Tage verloren.",
      "Warum gehen einige Paare nicht ins Fitnessstudio? Weil einige Beziehungen nicht funktionieren.",
      "Ich sagte meiner Frau, sie solle ihre Fehler umarmen... Sie gab mir eine Umarmung.",
      "Ich bin großartig im Multitasking. Ich kann Zeit verschwenden, unproduktiv sein und gleichzeitig prokrastinieren.",
      "Du weißt, dass du alt wirst, wenn du dich bückst, um deine Schnürsenkel zu binden, und dich fragst, was du sonst noch tun könntest, während du da unten bist.",
      "Ich bin so gut im Schlafen, ich kann es mit geschlossenen Augen tun.",
      "Wenn du denkst, dass es niemanden interessiert, ob du lebst, versuche, ein paar Zahlungen zu verpassen.",
      "Früher dachte ich, ich sei unentschlossen, aber jetzt bin ich mir nicht mehr so sicher.",
      "Wenn du sie nicht überzeugen kannst, verwirre sie.",
      "Ich sagte meiner Frau, sie ziehe ihre Augenbrauen zu hoch. Sie sah überrascht aus.",
      "Ich bin nicht tollpatschig, ich teste nur die Schwerkraft.",
      "Ich sagte meiner Frau, sie solle mehr Liegestütze machen. Sie sagte: 'Ich könnte hundert machen!' Also zählte ich bis zehn und hörte auf.",
      "Das Leben ist wie eine Schachtel Pralinen; es dauert nicht lange, wenn du hungrig bist.",
      "Ich sage nicht, dass ich Wonder Woman bin, ich sage nur, dass mich und Wonder Woman noch nie jemand zusammen im selben Raum gesehen hat.",
      "Warum nennen sie es Schönheitsschlaf, wenn du aufwachst und wie ein Troll aussiehst?",
      "Ich verliere nicht immer mein Telefon, aber wenn ich es tue, ist es immer auf lautlos.",
      "Mein Bett ist ein magischer Ort, an dem ich mich plötzlich an alles erinnere, was ich tun sollte.",
      "Ich liebe das Geräusch, das du machst, wenn du den Mund hältst.",
      "Ich streite nicht, ich erkläre nur, warum ich recht habe.",
      "Ich bin kein kompletter Idiot, einige Teile fehlen.",
      "Wenn das Leben dir Zitronen gibt, spritze jemandem in die Augen.",
      "Ich brauche kein Aggressionsmanagement. Du musst nur aufhören, mich wütend zu machen.",
      "Ich sage nicht, dass ich Batman bin. Ich sage nur, dass mich und Batman noch nie jemand zusammen im selben Raum gesehen hat.",
      "Ich sage nicht, dass ich Superman bin. Ich sage nur, dass mich und Superman noch nie jemand zusammen im selben Raum gesehen hat.",
      "Ich sage nicht, dass ich Spider-Man bin. Ich sage nur, dass mich und Spider-Man noch nie jemand zusammen im selben Raum gesehen hat.",
      "Ich sage nicht, dass ich ein Superheld bin. Ich sage nur, dass mich und einen Superhelden noch nie jemand zusammen im selben Raum gesehen hat.",
      "Der frühe Vogel kann den Wurm haben, weil Würmer ekelhaft sind und Morgen dumm sind.",
      "Wenn das Leben dir Zitronen gibt, mach Limonade. Dann finde jemanden, dessen Leben ihm Wodka gegeben hat, und feiere eine Party!",
      "Der Weg zum Erfolg ist immer im Bau.",
      "Ich bin so clever, dass ich manchmal kein einziges Wort von dem verstehe, was ich sage.",
      "Manche Leute brauchen einfach einen High-Five. Ins Gesicht. Mit einem Stuhl.",
      "Ich sage nicht, dass ich perfekt bin, aber ich bin ziemlich nah dran.",
      "Ein Tag ohne Sonnenschein ist wie, du weißt schon, Nacht.",
      "Der beste Weg, die Zukunft vorherzusagen, ist, sie zu erschaffen.",
      "Wenn du kein gutes Beispiel sein kannst, musst du eine schreckliche Warnung sein.",
      "Ich weiß nicht, warum ich immer wieder die Escape-Taste drücke. Ich versuche nur, hier rauszukommen.",
      "Ich bin nicht faul. Ich bin im Energiesparmodus.",
      "Ich brauche keinen Friseur, mein Kissen gibt mir jeden Morgen eine neue Frisur.",
      "Ich habe keine schlechte Handschrift, ich habe meine eigene Schriftart.",
      "Ich bin nicht tollpatschig. Es ist nur so, dass der Boden mich hasst, der Tisch und die Stühle sind Mobber und die Wände stehen mir im Weg.",
      "Ich sage nicht, dass ich Batman bin. Ich sage nur, dass mich und Batman noch nie jemand zusammen im selben Raum gesehen hat.",
      "Ich sage nicht, dass ich Wonder Woman bin. Ich sage nur, dass mich und Wonder Woman noch nie jemand zusammen im selben Raum gesehen hat.",
      "Ich sage nicht, dass ich Superman bin. Ich sage nur, dass mich und Superman noch nie jemand zusammen im selben Raum gesehen hat.",
      "Ich sage nicht, dass ich Spider-Man bin. Ich sage nur, dass mich und Spider-Man noch nie jemand zusammen im selben Raum gesehen hat.",
      "Ich sage nicht, dass ich ein Superheld bin. Ich sage nur, dass mich und einen Superhelden noch nie jemand zusammen im selben Raum gesehen hat."
      ];
