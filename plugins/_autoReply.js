export async function all(m) {
  // when someone sends a group link to the bot's dm
  if (
    (m.mtype === 'groupInviteMessage' ||
      m.text.startsWith('https://chat') ||
      m.text.startsWith('open this link')) &&
    !m.isBaileys &&
    !m.isGroup
  ) {
    this.sendButton(m.chat, `*Lade den Bot in eine Gruppe ein*      
    Hallo @${m.sender.split('@')[0]} 
    du kannst den Bot mieten, um einer Gruppe beizutreten oder den Besitzer kontaktieren 
    für mehr Infos klicke auf den Button
  `.trim(), igfg, null, [['GRUPPENHILFE', '.grp']] , m, { mentions: [m.sender] })
    m.react('💎')
  }

  return !0
}
