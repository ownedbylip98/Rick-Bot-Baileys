let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (/image/.test(mime)) {
    let img = await q.download()
    if (!img) throw '*ANTWORTE AUF EIN BILD.*'
    await conn
      .updateProfilePicture(m.chat, img)
      .then(_ => m.reply('*BILD ERFOLGREICH ALS PROFILBILD GESETZT.*'))
  } else throw '*ANTWORTE AUF EIN BILD.*'
}
handler.command = /^setpp(group|grup|gc)?$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
