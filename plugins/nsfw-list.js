let handler = async (m, { conn, usedPrefix }) => {
  if (!global.db.data.chats[m.chat].nsfw)
    throw `🚫 Diese Gruppe unterstützt keine NSFW-Inhalte \n\n Aktiviere es mit \n*${usedPrefix}enable* nsfw`
  let user = global.db.data.users[m.sender].age
  if (user < 17) throw m.reply(`❎ Du musst mindestens 18 Jahre alt sein`)

  m.react(rwait)
  let nsfwCommands = [
    'xnxx',
    'xvid',
    'genshin',
    'swimsuit',
    'schoolswimsuit',
    'white',
    'barefoot',
    'touhou',
    'gamecg',
    'hololive',
    'uncensored',
    'sunglasses',
    'glasses',
    'weapon',
    'shirtlift',
    'chain',
    'fingering',
    'flatchest',
    'torncloth',
    'bondage',
    'demon',
    'wet',
    'pantypull',
    'headdress',
    'headphone',
    'tie',
    'anusview',
    'shorts',
    'stockings',
    'topless',
    'beach',
    'bunnygirl',
    'bunnyear',
    'idol',
    'vampire',
    'gun',
    'maid',
    'bra',
    'nobra',
    'bikini',
    'whitehair',
    'blonde',
    'pinkhair',
    'bed',
    'ponytail',
    'nude',
    'dress',
    'underwear',
    'foxgirl',
    'uniform',
    'skirt',
    'sex',
    'sex2',
    'sex3',
    'breast',
    'twintail',
    'spreadpussy',
    'tears',
    'seethrough',
    'breasthold',
    'drunk',
    'fateseries',
    'spreadlegs',
    'openshirt',
    'headband',
    'food',
    'close',
    'tree',
    'nipples',
    'erectnipples',
    'horns',
    'greenhair',
    'wolfgirl',
    'catgirl',
  ]

  let message = `
  *NSFW-Befehlsmenü* 
  
  Hier ist die Liste der verfügbaren Befehle für NSFW-Inhalte. Verwende das Präfix "${usedPrefix}" gefolgt vom Befehlsnamen:
  
  ${nsfwCommands.map(command => `${usedPrefix}${command}`).join('\n')}
  
  Hinweis: Diese Befehle sind nur für Personen ab 18 Jahren.
  `

  console.log('Nachricht wird gesendet...')
  await conn.reply(m.chat, message, m)
  console.log('Nachricht gesendet.')
}

handler.help = ['nsfw']
handler.tags = ['nsfw']
handler.command = ['nsfw']
handler.group = true
handler.register = true

export default handler
