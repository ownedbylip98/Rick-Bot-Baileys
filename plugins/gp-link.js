import { areJidsSameUser } from '@whiskeysockets/baileys'
let handler = async (m, { conn, args }) => {
  let group = m.chat
  if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0]
  if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group)) throw '⚠️ Kann nur in Gruppen verwendet werden'
  let groupMetadata = await conn.groupMetadata(group)
  if (!groupMetadata) throw 'groupMetadata ist undefiniert :\\'
  if (!('participants' in groupMetadata)) throw 'participants ist nicht definiert :('
  let me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id))
  if (!me) throw '✳️ Ich bin nicht in dieser Gruppe :('
  if (!me.admin) throw '✳️ Ich bin kein Administrator'
  m.reply('https://chat.whatsapp.com/' + (await conn.groupInviteCode(group)))
}
handler.help = ['link']
handler.tags = ['group']
handler.command = ['link', 'linkgroup']

export default handler
