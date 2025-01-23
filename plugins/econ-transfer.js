const items = ['diamond', 'coin']
let confirmation = {}

async function handler(m, { conn, args, usedPrefix, command }) {
    if (confirmation[m.sender]) return m.reply('Du hast bereits eine laufende Überweisung.')
    let user = global.db.data.users[m.sender]
    const item = items.filter(v => v in user && typeof user[v] == 'number')
    let lol = `✳️ Verwende den Befehl:
*${usedPrefix + command}*  [Typ] [Betrag] [@Benutzer]

📌 Beispiel: 
*${usedPrefix + command}* coin 65 @${m.sender.split('@')[0]}

📍 Übertragbare Gegenstände:
┌──────────────
▢ *diamond* = Diamant 💎
▢ *coin* = Münze 🪙
└──────────────
`.trim()
    const type = (args[0] || '').toLowerCase()
    if (!item.includes(type)) return conn.reply(m.chat, lol, m, { mentions: [m.sender] })
    const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
    if (!/^[1-9]\d*$/.test(args[1])) throw `✳️ Der Betrag muss eine Zahl sein.`; //-- test
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
    if (!who) return m.reply(`✳️ Du musst einen Benutzer erwähnen.`)
    if (!(who in global.db.data.users)) return m.reply(`✳️ Der Benutzer ist nicht in der Datenbank.`)
    if (user[type] * 1 < count) return m.reply(`✳️ Du hast nicht genug *${type}*.`)
    let confirm = `
Möchtest du wirklich *${count}* _*${type}*_ an *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* senden? 

- Schreibe *ja* oder *nein*
`.trim()
   
    conn.reply(m.chat, confirm, m, { mentions: [who] })
    confirmation[m.sender] = {
        sender: m.sender,
        to: who,
        message: m,
        type,
        count,
        timeout: setTimeout(() => (m.reply(`⏳ Zeitüberschreitung.`), delete confirmation[m.sender]), 60 * 1000)
    }
}
//--
handler.before = async m => {
    if (m.isBaileys) return
    if (!(m.sender in confirmation)) return
    if (!m.text) return
    let { timeout, sender, message, to, type, count } = confirmation[m.sender]
    if (m.id === message.id) return
    let user = global.db.data.users[sender]
    let _user = global.db.data.users[to]
    if (/nein?/g.test(m.text.toLowerCase())) {
        clearTimeout(timeout)
        delete confirmation[sender]
        return m.reply(`✅ Überweisung abgebrochen.`)
    }
    if (/ja?/g.test(m.text.toLowerCase())) {
        let previous = user[type] * 1
        let _previous = _user[type] * 1
        user[type] -= count * 1
        _user[type] += count * 1
        if (previous > user[type] * 1 && _previous < _user[type] * 1) m.reply(`✅ Überweisung erfolgreich. \n\n*${count}* *${type}* an @${(to || '').replace(/@s\.whatsapp\.net/g, '')} gesendet.`, null, { mentions: [to] })
        else {
            user[type] = previous
            _user[type] = _previous
            m.reply(`❎ Fehler bei der Überweisung von *${count}* ${type} an *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] })
        }
        clearTimeout(timeout)
        delete confirmation[sender]
    }
}

handler.help = ['transfer'].map(v => v + ' [typ] [betrag] [@tag]')
handler.tags = ['econ']
handler.command = ['payxp','paydi', 'transfer', 'darxp','dardi', 'pay']

export default handler

function isNumber(x) {
    return !isNaN(x)
}
