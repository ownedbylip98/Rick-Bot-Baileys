async function handler(m, { conn }) {



  conn.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, m.chat)

  let a = await m.reply("Chat erfolgreich gelöscht!") 



}

handler.help = ['deletechat'],

handler.tags = ['owner'],

handler.command = /^(deletechat|delchat|dchat|clearchat|cleanchat)$/i

handler.owner = true

export default handler


