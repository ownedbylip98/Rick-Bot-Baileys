let handler = m => m
handler.all = async function (m) {
  for (const message in audioMsg) {
    if (new RegExp(`^${message}$`, 'i').test(m.text)) {
      this.sendFile(m.chat, audioMsg[message], 'audio.mp3', null, m, true)
      break
    }
  }
  return !0
 }

export default handler


let audioMsg = {
  'feine Herren': './src/mp3/fino.mp3',
  'guten Morgen': 'https://k.top4top.io/m_2826iqdri1.mp3',
  'guten Tag': 'https://b.top4top.io/m_2826v2zg51.mp3',
  'gute Nacht': 'https://i.top4top.io/m_2826o8rfj1.mp3',
  'traurig': 'https://h.top4top.io/m_2826mcim21.mp3',
  '@5491168352204|@59172945992': 'https://l.top4top.io/m_2492i4mdu1.mp3'
}
