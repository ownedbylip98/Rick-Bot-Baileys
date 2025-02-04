export async function before(m) {
  const chat = global.db.data.chats[m.chat]
  if (!chat.autotype) return

  const commands = Object.values(global.plugins).flatMap(plugin => [].concat(plugin.command))
  const presenceStatus = commands.some(cmd =>
    cmd instanceof RegExp ? cmd.test(m.text) : m.text.includes(cmd)
  )
    ? 'schreibt'
    : 'verfügbar'

  if (presenceStatus) await this.sendPresenceUpdate(presenceStatus, m.chat)
}

export const disabled = false
