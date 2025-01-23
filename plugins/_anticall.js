const delay = time => new Promise(res => setTimeout(res, time))

export async function before(m) {
  let bot = global.db.data.settings[this.user.jid] || {}
 
  if (m.isBaileys) return
  if (!bot.antiCall) return

  const messageType = {
    40: '📞 Sie haben einen Sprachanruf verpasst, und der Anruf wurde verpasst.',
    41: '📹 Sie haben einen Videoanruf verpasst, und der Anruf wurde verpasst.',
    45: '📞 Sie haben einen Gruppen-Sprachanruf verpasst, und der Anruf wurde verpasst.',
    46: '📹 Sie haben einen Gruppen-Videoanruf verpasst, und der Anruf wurde verpasst.',
  }[m.messageStubType]

  
  if (messageType) {
   

    await this.sendMessage(m.chat, {
      text: `Sie sind gesperrt + blockiert, weil Sie den Bot angerufen haben`,
      mentions: [m.sender],
    })

   
    await delay(1000)

    global.db.data.users[m.sender].banned = true
    global.db.data.users[m.sender].warning = 1

   

    await this.updateBlockStatus(m.sender, 'block')

  
    if (m.isGroup) {
      await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }
  } else {
    console.log({
      messageStubType: m.messageStubType,
      messageStubParameters: m.messageStubParameters,
      type: m.messageStubType,
    })
  }
}

export const disabled = false
