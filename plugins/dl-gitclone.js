import fetch from 'node-fetch'
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0])
    throw `Wo ist der GitHub-Link?\n\n📌 Beispiel: ${usedPrefix + command} https://github.com/GlobalTechInfo`
  if (!regex.test(args[0])) throw '⚠️ Link ist falsch'
  let [_, user, repo] = args[0].match(regex) || []
  repo = repo.replace(/.git$/, '')
  let url = `https://api.github.com/repos/${user}/${repo}/zipball`
  let filename = (await fetch(url, { method: 'HEAD' })).headers
    .get('content-disposition')
    .match(/attachment; filename=(.*)/)[1]

  m.reply(`✳️ *Warte, Repository wird gesendet..*`)
  conn.sendFile(m.chat, url, filename, null, m)
}
handler.help = ['gitclone <url>']
handler.tags = ['downloader']
handler.command = ['gitclone']
handler.credit = true

export default handler
