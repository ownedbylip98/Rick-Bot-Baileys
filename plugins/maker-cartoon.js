import axios from 'axios'
import jimp from 'jimp'
import FormData from 'form-data'
import { Sticker, createSticker, StickerTypes } from 'wa-sticker-formatter'

async function GetBuffer(url) {
  return new Promise(async (resolve, reject) => {
    let buffer
    await jimp
      .read(url)
      .then(image => {
        image.getBuffer(image._originalMime, function (err, res) {
          buffer = res
        })
      })
      .catch(reject)
    if (!Buffer.isBuffer(buffer)) reject(false)
    resolve(buffer)
  })
}
function GetType(Data) {
  return new Promise((resolve, reject) => {
    let Result, Status
    if (Buffer.isBuffer(Data)) {
      Result = new Buffer.from(Data).toString('base64')
      Status = 0
    } else {
      Status = 1
    }
    resolve({
      status: Status,
      result: Result,
    })
  })
}
async function Cartoon(url) {
  return new Promise(async (resolve, reject) => {
    let Data
    try {
      let buffer = await GetBuffer(url)
      let Base64 = await GetType(buffer)
      await axios
        .request({
          url: 'https://access1.imglarger.com/PhoAi/Upload',
          method: 'POST',
          headers: {
            connection: 'keep-alive',
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
          },
          data: JSON.stringify({
            type: 11,
            base64Image: Base64.result,
          }),
        })
        .then(async ({ data }) => {
          let code = data.data.code
          let type = data.data.type
          while (true) {
            let LopAxios = await axios.request({
              url: 'https://access1.imglarger.com/PhoAi/CheckStatus',
              method: 'POST',
              headers: {
                connection: 'keep-alive',
                accept: 'application/json, text/plain, */*',
                'content-type': 'application/json',
              },
              data: JSON.stringify({
                code: code,
                isMember: 0,
                type: type,
              }),
            })
            let status = LopAxios.data.data.status
            if (status == 'success') {
              Data = {
                message: 'success',
                download: {
                  full: LopAxios.data.data.downloadUrls[0],
                  head: LopAxios.data.data.downloadUrls[1],
                },
              }
              break
            } else if (status == 'noface') {
              Data = {
                message: 'noface',
              }
              break
            }
          }
        })
    } catch (_error) {
      Data = false
    } finally {
      if (Data == false) {
        reject(false)
      }
      resolve(Data)
    }
  })
}
function randomId() {
  return Math.floor(100000 + Math.random() * 900000)
}
let handler = async (m, { conn, usedPrefix, command }) => {
  conn.cartoon = conn.cartoon ? conn.cartoon : {}
  if (m.sender in conn.cartoon)
    throw "Es gibt noch einen unvollendeten Prozess, mein Freund. Bitte warte, bis er abgeschlossen ist. >//<"
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (!mime) throw `Wo ist das Bild, das du in einen Cartoon umwandeln möchtest?`
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Datei ${mime} wird nicht unterstützt`
  else conn.cartoon[m.sender] = true
  m.reply('Das Bild wird in einen Cartoon umgewandelt')
  let img = await q.download?.()
  try {
    Cartoon(img).then(async response => {
      if (response.message == 'success') {
        await conn.sendFile(
          m.chat,
          response.download.full,
          '',
          'Die Operation war erfolgreich♥  >//<',
          m
        )
        let name = await conn.getName(m.sender),
          sticker = new Sticker(response.download.head, {
            pack: global.packname,
            author: name,
            type: StickerTypes.FULL,
            categories: ['🤩', '🎉'],
            id: randomId(),
            quality: 100,
            background: '#00000000',
          })
        conn.sendMessage(m.chat, await sticker.toMessage(), { quoted: m })
      } else {
        m.reply(
          'Entschuldigung, mein Freund, das Bild zeigt kein Gesicht. Bitte sende ein Bild, auf dem das Gesicht freigelegt und sichtbar ist.'
        )
      }
    })
  } catch {
    m.reply('Prozess fehlgeschlagen :(')
  } finally {
    conn.cartoon[m.sender] ? delete conn.cartoon[m.sender] : false
  }
}
handler.help = ['tocartoon']
handler.tags = ['AI']
handler.command = ['tocartoon']

handler.premium = false

export default handler
