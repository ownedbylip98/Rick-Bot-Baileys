import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn: conn, command, args, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, 'Gib den Titel eines YouTube-Videos oder -Songs ein.\n\n`Beispiel:`\n' + `> *${usedPrefix + command}* Gemini Aaliyah - If Only`, m)
await m.react('⏳')
    try {
    let res = await search(args.join(" "))
    let img = await (await fetch(`${res[0].image}`)).buffer()
    let txt = '`乂  Y O U T U B E  -  P L A Y`\n\n'
       txt += `	✩   *Titel* : ${res[0].title}\n`
       txt += `	✩   *Dauer* : ${secondString(res[0].duration.seconds)}\n`
       txt += `	✩   *Veröffentlicht* : ${eYear(res[0].ago)}\n`
       txt += `	✩   *Kanal* : ${res[0].author.name || 'Unbekannt'}\n`
       txt += `	✩   *Url* : ${'https://youtu.be/' + res[0].videoId}\n\n`
       txt += `> *-*Zum Herunterladen antworte auf diese Nachricht mit *Video* oder *Audio*.`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
await m.react('✅')
} catch {
await m.react('❌')
}}
handler.help = ['play *<suche>*']
handler.tags = ['downloader']
handler.command = ['play5']
//handler.register = true 
export default handler

async function search(query, options = {}) {
  let search = await yts.search({ query, hl: "de", gl: "DE", ...options })
  return search.videos
}

function MilesNumber(number) {
  let exp = /(\d)(?=(\d{3})+(?!\d))/g
  let rep = "$1."
  let arr = number.toString().split(".")
  arr[0] = arr[0].replace(exp, rep)
  return arr[1] ? arr.join(".") : arr[0]
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' Tag, ' : ' Tage, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' Stunde, ' : ' Stunden, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' Minute, ' : ' Minuten, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' Sekunde' : ' Sekunden') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function sNum(num) {
    return new Intl.NumberFormat('de-DE', { notation: "compact", compactDisplay: "short" }).format(num)
}

function eYear(txt) {
    if (!txt) {
        return '×'
    }
    if (txt.includes('month ago')) {
        var T = txt.replace("month ago", "").trim()
        var L = 'vor '  + T + ' Monat'
        return L
    }
    if (txt.includes('months ago')) {
        var T = txt.replace("months ago", "").trim()
        var L = 'vor ' + T + ' Monaten'
        return L
    }
    if (txt.includes('year ago')) {
        var T = txt.replace("year ago", "").trim()
        var L = 'vor ' + T + ' Jahr'
        return L
    }
    if (txt.includes('years ago')) {
        var T = txt.replace("years ago", "").trim()
        var L = 'vor ' + T + ' Jahren'
        return L
    }
    if (txt.includes('hour ago')) {
        var T = txt.replace("hour ago", "").trim()
        var L = 'vor ' + T + ' Stunde'
        return L
    }
    if (txt.includes('hours ago')) {
        var T = txt.replace("hours ago", "").trim()
        var L = 'vor ' + T + ' Stunden'
        return L
    }
    if (txt.includes('minute ago')) {
        var T = txt.replace("minute ago", "").trim()
        var L = 'vor ' + T + ' Minute'
        return L
    }
    if (txt.includes('minutes ago')) {
        var T = txt.replace("minutes ago", "").trim()
        var L = 'vor ' + T + ' Minuten'
        return L
    }
    if (txt.includes('day ago')) {
        var T = txt.replace("day ago", "").trim()
        var L = 'vor ' + T + ' Tag'
        return L
    }
    if (txt.includes('days ago')) {
        var T = txt.replace("days ago", "").trim()
        var L = 'vor ' + T + ' Tagen'
        return L
    }
    return txt
}
