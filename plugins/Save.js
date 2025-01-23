import fs from 'fs'
import syntaxError from 'syntax-error'
import path from 'path'
import util from 'util'

const _fs = fs.promises

let handler = async (m, { text, usedPrefix, command, __dirname }) => {
    if (!text) throw `
Verwendung: ${usedPrefix}${command} <Dateiname>
Beispiel: ${usedPrefix}savefile lazack.js
          ${usedPrefix}saveplugin owner
`.trim()
    if (!m.quoted) throw `Antworte/zitiere das Medium/Text, das du speichern möchtest`
    if (/p(lugin)?/i.test(command)) {
        let filename = text.replace(/plugin(s)\//i, '') + (/\.js$/i.test(text) ? '' : '.js')
        const error = syntaxError(m.quoted.text, filename, {
            sourceType: 'module',
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true
        })
        if (error) throw error
        const pathFile = path.join(__dirname, filename)
        // TODO: make confirmation to save if file already exists
        // if (fs.existSync(pathFile, fs.constants.R_OK)) return m.reply(`Datei ${filename} existiert bereits`)
        await _fs.writeFile(pathFile, m.quoted.text)
        m.reply(`
Erfolgreich gespeichert unter *${filename}*

\`\`\`
${util.format(m.quoted.text)}
\`\`\`
`.trim())
    } else {
        const isJavascript = m.quoted.text && !m.quoted.mediaMessage && /\.js/.test(text)
        if (isJavascript) {
            const error = syntaxError(m.quoted.text, text, {
                sourceType: 'module',
                allowReturnOutsideFunction: true,
                allowAwaitOutsideFunction: true
            })
            if (error) throw error
            await _fs.writeFile(text, m.quoted.text)
            m.reply(`
Erfolgreich gespeichert unter *${text}*

\`\`\`
${util.format(m.quoted.text)}
\`\`\`
`.trim())
        } else if (m.quoted.mediaMessage) {
            const media = await m.quoted.download()
            await _fs.writeFile(text, media)
            m.reply(`
Erfolgreich gespeichert unter *${text}*
`.trim())
        } else {
            throw 'Nicht unterstützt!!'
        }
    }
}
handler.help = ['plugin', 'file'].map(v => `save${v} <Dateiname>`)
handler.tags = ['owner']
handler.command = /^(save|s)(p(lugin)?|(f(ile)?))$/i

handler.rowner = true

export default handler
