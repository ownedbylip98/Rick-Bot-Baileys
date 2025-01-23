let handler = async (m, { conn }) => {
  await conn
    .fetchBlocklist()
    .then(async data => {
      let txt = `*≡ Blockierte Liste*\n\n*Gesamt :* ${data.length}\n\n┌─⊷\n`
      for (let i of data) {
        txt += `▢ @${i.split('@')[0]}\n`
      }
      txt += '└───────────'
      return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) })
    })
    .catch(err => {
      console.log(err)
      throw 'Es gibt keine blockierten Nummern'
    })
}
handler.help = ['blockliste']
handler.tags = ['main']
handler.command = ['blockliste']
handler.rowner = true
export default handler
