let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  if (!(who in global.db.data.users)) throw `✳️ Der Benutzer ist nicht in meiner Datenbank gefunden`

  let pp = './assets/A.jpg'
  let more = String.fromCharCode(8206)
  let readMore = more.repeat(850)

  let lkr
  switch (command) {
    case 'listmenu':
    case 'menulist':
      lkr ='*Mach dich bereit für die Fahrt, hier sind deine Ticketoptionen:*\n\n' +
        '🌅 *' +
        usedPrefix +
        "botmenu* - Das geheime Kontrollpanel des Bots.\n\n" +
        '🖲️ *' +
        usedPrefix +
        "ownermenu* - Ja, das ist für dich, Boss!\n\n" +
        '🛫 *' +
        usedPrefix +
        'groupmenu* - Gruppen, um Menschen zu vereinen.\n\n' +
        '🗂️ *' +
        usedPrefix +
        "dlmenu* - 'DL' steht für 'Delicious Loot'.\n\n" +
        '🎭 *' +
        usedPrefix +
        "funmenu* - Der Partyhut des Bots. Spiele, Witze und sofortige ROFLs.\n\n" +
        '💵 *' +
        usedPrefix +
        'economy* - Dein persönlicher Tresor der virtuellen Wirtschaft.\n\n' +
        '🎮 *' +
        usedPrefix +
        'gamemenu* - Betritt die Gaming-Arena.\n\n' +
        '🫐 *' +
        usedPrefix +
        'stickermenu* - Ein Regenbogen von Stickern.\n\n' +
        '🪙 *' +
        usedPrefix +
        'toolsmenu* - Dein praktisches Werkzeugset.\n\n' +
        '🧲 *' +
        usedPrefix +
        'logomenu* - Erstelle ein Logo, das dich repräsentiert.\n\n' +
        '💟 *' +
        usedPrefix +
        'nsfwmenu* - Das After-Dark-Menü.\n\n' +
        '🌀 *' +
        usedPrefix +
        'aimenu* - Deine persönlichen künstlichen Intelligenz-Copiloten.\n\n' +
        '🎧 *' +
        usedPrefix +
        'aeditor* - Tune das Mp3/Audio nach deinen Wünschen.\n\n' +
         '🎉 *' +
        usedPrefix +
        'animemenu* - Animierte Bilder, Sticker und Videos.\n\n' +
         '🍒 *' +
        usedPrefix +
        'reactions* - Anime-Reaktionsmenü für Gruppen.\n\n' +
        '🪁 *' +
        usedPrefix +
        'infoanime* - Vollständige Informationen über Animes wie IMDb.\n\n' +
        '💡 *' +
        usedPrefix +
        'imagen* - Erstelle Bilder und Designs basierend auf deinen Gedanken/Prompts.\n\n' +
        '🃏 *' +
        usedPrefix +
        'randompic* - Zufällige Bilder, die dir gefallen könnten.\n\n' +
        '🏖️ *' +
        usedPrefix +
        'textpro* - Erstelle schöne Logos mit einem Text deiner Wahl.\n\n' +
        '🎥 *' +
        usedPrefix +
        'randomvid* - Zufällige Videos, die dir gefallen könnten.\n\n' +
        '🖍️ *' +
        usedPrefix +
        'fancy* - Fancy-Text-Generator-Menü.' 
        break

    case 'botmenu':
      lkr = `
╭───『 *Bot* 』─❍
◈ •quran
◈ •autoreact
◈ •gita
◈ •ping
◈ •uptime
◈ •alive
◈ •language
◈ •server
◈ •rentbot
◈ •listrent
◈ •stoprent
◈ •botinfo
◈ •owner
◈ •script
◈ •speedtest
◈ •runtime
◈ •menu
◈ •menu2
◈ •menu3
◈ •menu4
◈ •donate
◈ •groups
◈ •blocklist
◈ •listprem
◈ •listmenu
◈ •mrcs
◈ © OwnedbyLIP
╰─────────❍` // Your bot menu message here
      break
      case 'aimenu':
      lkr=`
 ╭───『 *AI* 』─❍
 ◈ •chatgpt
 ◈ •googleit
 ◈ •blackbox
 ◈ •gpt4
 ◈ •travel
 ◈ •blackpink
 ◈ •image
 ◈ •google
 ◈ •bro
 ◈ •ai
 ◈ •fact
 ◈ •why
 ╰─────────❍` //
 break

 case 'logosmaker':
 case 'ephoto':
 case 'textpro':
      lkr=`
 ╭───『 *AI* 』─❍
 ◈ •papercut
 ◈ •logomaker
 ◈ •bpstyle
 ◈ •cartoon
 ◈ •glossy
 ◈ •writetext
 ◈ •texteffect
 ◈ •lighteffect
 ◈ •advancedglow
 ◈ •pixelglitch
 ◈ •clouds
 ◈ •galaxy
 ◈ •beach
 ╰─────────❍` //
 break
      case 'imagen':
      case 'imagenai':
      lkr=`
 ╭───『 *Imagen* 』─❍
 ◈ •hercai-lexica
 ◈ •hercai-raava
 ◈ •hercai-shonin
 ◈ •hercai-cartoon
 ◈ •hercai-animefy
 ◈ •hercai-prodia
 ◈ •hercai-simurg
 ◈ •photoleap
 ◈ •realistic
 ◈ •lexica
 ◈ •dalle
 ╰─────────❍` //
 break
    case 'ownermenu':
      lkr = `
╭───『 *Owner* 』─❍
◈ •enable
◈ •intro
◈ •banchat
◈ •autoreact
◈ •unbanchat
◈ •banuser
◈ •unbanuser
◈ •broadcast
◈ •broadcastgc
◈ •readviewonce
◈ •setprivacy
◈ •setppbot
◈ •setprefix
◈ •resetprefix
◈ •getfile
◈ •getplugin
◈ •plugins
◈ •listplugins
◈ •install
◈ •remove
◈ •savecontact
◈ •fakereply
◈ •delcmd
◈ •listcmd
◈ •getmsg
◈ •addprem
◈ •delprem
◈ •addsudo
◈ •delsudo
◈ •addowner
◈ •delowner
◈ •allvars
◈ •broadcast
◈ •fullpp
◈ •inspect
◈ •cleartmp
◈ •clearchat
◈ •restart
◈ •savefile
◈ •logout
◈ •unban
◈ •update
◈ •intro
◈ •ban
◈ •var
◈ •afk
◈ •save
◈ •allow
◈ •listban
◈ •join
╰─────────❍` //
      break
      case 'randompic':
      lkr = `
╭───『 *RandomPic* 』─❍
◈ •chinese
◈ •malaysia
◈ •hijab
◈ •japanese
◈ •korean
◈ •malay
◈ •random
◈ •random2
◈ •thai
◈ •vietnamese
◈ •indo
◈ •girl
◈ •person
◈ •boneka
◈ •blackpink3
◈ •bike
◈ •antiwork
◈ •aesthetic
◈ •justina
◈ •doggo
◈ •cat
◈ •cosplay2
◈ •car
◈ •profile2
◈ •notnot
◈ •kpop
◈ •kayes
◈ •ulzzanggirl
◈ •ulzzangboy
◈ •ryujin
◈ •pubg
◈ •wallml
◈ •wallhp
╰─────────❍` //
      break
      case 'randomvid':
      lkr = `
╭───『 *RandomVid* 』─❍
◈ •tiktokgirl
◈ •tiktokghea
◈ •tiktokbocil
◈ •tiktoknukhty
◈ •tiktoksantuy
◈ •tiktokkayes
◈ •tiktokpanrika
◈ •tiktoknotnot
╰─────────❍` //
      break
    case 'groupmenu':
      lkr = `
╭───『 *Group* 』─❍
◈ •kick
◈ •wyr
◈ •promote
◈ •demote
◈ •groupinfo
◈ •getjids
◈ •resetlink
◈ •antilink
◈ •link
◈ •setpp
◈ •setname
◈ •setdesc
◈ •setwelcome
◈ •setbye
◈ •hidetag
◈ •tagall
◈ •totag
◈ •notify
◈ •delwarn
◈ •warn
◈ •unwarn
◈ •warns
◈ •add
◈ •delete
◈ •group
◈ •enable
◈ •disable
◈ •toxic
◈ •ship
◈ •register
◈ •unreg
◈ •mysn
◈ •poll
◈ •simulate
◈ •admins
╰─────────❍` //
      break
    case 'downloadermenu':
    case 'dlmenu':
    case 'downloads':
      lkr = `
╭───『 *Download* 』─❍
◈ •likee
◈ •pinterest
◈ •pinterest2
◈ •threads
◈ •capcut
◈ •itunes
◈ •play
◈ •play2
◈ •play5
◈ •audio
◈ •video
◈ •mega
◈ •ytsearch
◈ •ytmp3 
◈ •ytmp4
◈ •gdrive
◈ •gitclone
◈ •githubstalk
◈ •npmstalk
◈ •githubdl
◈ •twitter
◈ •tiktok
◈ •ttstalk
◈ •gimage
◈ •insta
◈ •igstory
◈ •igstalk
◈ •mediafire
◈ •facebook
◈ •wallpapers
◈ •rwall
◈ •rnekos
◈ •swdl
◈ •apkdl
◈ •apksearch
◈ •playstore
◈ •ringtone
◈ •dlstatus
╰─────────❍` //
      break
    case 'economymenu':
    case 'economy':
      lkr = `
╭───『 *Economy* 』─❍
◈ •claim/daily
◈ •weekly
◈ •monthly
◈ •wallet
◈ •withdraw
◈ •leaderboard
◈ •levelup
◈ •addxp
◈ •buych
◈ •buyall
◈ •addgold
◈ •bank
◈ •deposit
◈ •give
◈ •bet
◈ •heal
◈ •craft
◈ •balance
◈ •shop
◈ •sell
◈ •rob
◈ •adventure
◈ •opencrate
◈ •mine
◈ •work
◈ •transfer
◈ •todiamond
◈ •tomoney
╰────────❍ ` //
      break
    case 'funmenu':
      lkr = `
╭───『 *Fun* 』─❍
◈ •character
◈ •truth
◈ •dare
◈ •hack
◈ •flirt
◈ •gay
◈ •shayeri
◈ •ship
◈ •waste
◈ •alexa
◈ •simpcard
◈ •hornycard
◈ •ytcomment
◈ •stupid
◈ •lolicon
╰─────────❍` //
      break
      case 'animereactions':
case 'reactions':
lkr=`
╭───『 *Reactions* 』─❍
◈ •bully
◈ •cuddle
◈ •cry
◈ •hug
◈ •awoo
◈ •kiss
◈ •lick
◈ •pat
◈ •smug
◈ •bonk
◈ •yeet
◈ •blush
◈ •wave
◈ •highfive
◈ •handhold
◈ •nom
◈ •bite
◈ •glomp
◈ •slap
◈ •kill
◈ •happy
◈ •wink
◈ •poke
◈ •dance
◈ •cringe
╰─────────❍` //
      break
    case 'animemenu':
      lkr = `
╭───『 *Anime* 』─❍
◈ •waifu
◈ •neko
◈ •loli
◈ •couplepp
◈ •toanime
◈ •naruto
◈ •itachi
◈ •akira
◈ •asuna
◈ •akiyama
◈ •boruto
◈ •hornycard
◈ •ayuzawa
◈ •anna
◈ •chiho
◈ •chitoge
◈ •deidara
◈ •erza
◈ •elaina
◈ •emilia
◈ •hestia
◈ •hinata
◈ •inori
◈ •isuzu
◈ •kagura
◈ •kaori
◈ •keneki
◈ •kurumi
◈ •madara
◈ •mikasa
◈ •miku
◈ •minato
◈ •nezuko
◈ •sagiri
◈ •sasuke
◈ •sakura
◈ •kotori
╰─────────❍` //
      break
      case 'infoanime':
      lkr = `
╭───『 *Info Anime* 』─❍
◈ •anime waifu
◈ •anime neko
◈ •anime loli
◈ •anime naruto
◈ •anime itachi
◈ •anime akira
◈ •anime asuna
◈ •anime akiyama
◈ •anime boruto
◈ •anime ayuzawa
◈ •anime anna
◈ •anime chiho
◈ •anime chitoge
◈ •anime deidara
◈ •anime erza
◈ •anime elaina
◈ •anime emilia
◈ •anime hestia
◈ •anime hinata
◈ •anime inori
◈ •anime isuzu
◈ •anime kagura
◈ •anime kaori
◈ •anime keneki
◈ •anime kurumi
◈ •anime madara
◈ •anime mikasa
◈ •anime miku
◈ •anime minato
◈ •anime nezuko
◈ •anime sagiri
◈ •anime sasuke
◈ •anime sakura
◈ •anime kotori
╰─────────❍` //
      break
    case 'gamemenu':
    case 'gamesmenu':
      lkr = `
╭───『 *Game* 』─❍
◈ •tictactoe
◈ •delttt
◈ •chess
◈ •math
◈ •math answer
◈ •ppt
◈ •slot
◈ •cock-fight
◈ •roulette
◈ •casino
◈ •guessflag
◈ •fhint
╰─────────❍` //
      break
    case 'stickermenu':
      lkr = `
╭───『 *Sticker* 』─❍
◈ •s
◈ •tenor
◈ •take
◈ •scircle
◈ •smaker
◈ •removebg
◈ •smeme
◈ •trigger
◈ •stickers
◈ •getsticker
◈ •tgsticker
◈ •emojimix
◈ •toimg
◈ •tovid
◈ •quote
◈ •quoted
◈ •rc
◈ •ttp
◈ •ttp2
◈ •attp
◈ •attp2
◈ •attp3
╰─────────❍` //
      break
    case 'toolmenu':
    case 'toolsmenu':
      lkr = `
╭───『 *Tools* 』─❍
◈ •autosticker
◈ •topdf
◈ •base64
◈ •whatmusic
◈ •filelength
◈ •tempmail
◈ •checkmail
◈ •course
◈ •calc
◈ •google
◈ •googleit
◈ •linux
◈ •imdb
◈ •reddit
◈ •lyrics
◈ •wattpad
◈ •happymod
◈ •android
◈ •styletext
◈ •trendtwit
◈ •wikipedia
◈ •readmore
◈ •ssweb
◈ •carbon
◈ •element
◈ •translate
◈ •tourl
◈ •trace
◈ •nowa
◈ •qrmaker
◈ •readqr
◈ •fancy
◈ •weather
◈ •tocartoon
◈ •quote
◈ •technews
◈ •define
◈ •itunes
◈ •pokedex
◈ •removebg
◈ •tinyurl/shorturl
◈ •readvo
◈ •true
◈ •wa
◈ •pokedex
◈ •voz
◈ •remini
◈ •enhance
╰─────────❍` //
break
case 'aeditor':
case 'audioeditor':
lkr=`
╭───『 *Audio* 』─❍
◈ •bass
◈ •blown
◈ •deep
◈ •earrape
◈ •fast
◈ •nightcore
◈ •reverse
◈ •robot
◈ •slow
◈ •smooth
◈ •tupai
◈ •squirrel
◈ •chipmunk
╰─────────❍` //
      break
    case 'nsfwmenu': 
      lkr = `
  ╭───『 *Nsfw* 』─❍
  ◈ •genshin
  ◈ •swimsuit
  ◈ •schoolswimsuit
  ◈ •white
  ◈ •barefoot
  ◈ •touhou
  ◈ •gamecg
  ◈ •hololive
  ◈ •uncensored
  ◈ •sunglasses
  ◈ •glasses
  ◈ •weapon
  ◈ •shirtlift
  ◈ •chain
  ◈ •fingering
  ◈ •flatchest
  ◈ •torncloth
  ◈ •bondage
  ◈ •demon
  ◈ •wet
  ◈ •pantypull
  ◈ •headdress
  ◈ •headphone
  ◈ •tie
  ◈ •anusview
  ◈ •shorts
  ◈ •stokings
  ◈ •topless
  ◈ •beach
  ◈ •bunnygirl
  ◈ •bunnyear
  ◈ •idol
  ◈ •vampire
  ◈ •gun
  ◈ •maid
  ◈ •bra
  ◈ •nobra
  ◈ •bikini
  ◈ •whitehair
  ◈ •blonde
  ◈ •pinkhair
  ◈ •bed
  ◈ •ponytail
  ◈ •nude
  ◈ •dress
  ◈ •underwear
  ◈ •foxgirl
  ◈ •uniform
  ◈ •skirt
  ◈ •sex
  ◈ •sex2
  ◈ •sex3
  ◈ •breast
  ◈ •twintail
  ◈ •spreadpussy
  ◈ •tears
  ◈ •seethrough
  ◈ •breasthold
  ◈ •drunk
  ◈ •fateseries
  ◈ •spreadlegs
  ◈ •openshirt
  ◈ •headband
  ◈ •food
  ◈ •close
  ◈ •tree
  ◈ •nipples
  ◈ •erectnipples
  ◈ •horns
  ◈ •greenhair
  ◈ •wolfgirl
  ◈ •catgirl
  ◈ •nsfw
  ◈ •ass
  ◈ •boobs
  ◈ •lesbian
  ◈ •pussy
  ◈ •pack
  ◈ •xvid
  ◈ •xnxx
  ╰─────────❍` //
      break
    case 'logomenu':
    case 'makermenu':
      lkr = `
  ╭───『 *Maker* 』─❍
  ◈ •blur
  ◈ •enhance
  ◈ •difuminar2
  ◈ •hornycard
  ◈ •hornylicense
  ◈ •gfx1
  ◈ •gfx2
  ◈ •gfx3
  ◈ •gfx4
  ◈ •gfx5
  ◈ •gfx6
  ◈ •gfx7
  ◈ •gfx8
  ◈ •gfx9
  ◈ •gfx10
  ◈ •gfx11
  ◈ •gfx12
  ◈ •simpcard
  ◈ •itssostupid
  ◈ •iss
  ◈ •stupid
  ◈ •tweet <comment>
  ◈ •lolicon
  ◈ •logololi
  ◈ •ytcomment <comment>
  ╰─────────❍` //
      break
    default:
      lkr = `Invalid command. Type ${usedPrefix}list to see available options.`
  }

  conn.sendFile(m.chat, pp, 'perfil.jpg', lkr, m, false, { mentions: [who] })

  let done = '👍'
  m.react(done)
}

handler.help = [
  'listmenu',
  'menulist',
  'aimenu',
  'animereactions',
  'reactions',
  'imagen',
  'textpro',
  'textmaker',
  'logosmaker',
  'imagenai',
  'animemenu',
  'aeditor',
  'audioeditor',
  'infoanime',
  'botmenu',
  'ownermenu',
  'groupmenu',
  'dlmenu',
  'downloads',
  'downloadermenu',
  'economymenu',
  'economy',
  'funmenu',
  'gamemenu',
  'gamesmenu',
  'stickermenu',
  'nsfwmenu',
  'logomenu',
  'makermenu',
  'randompic',
  'randomvid',
  'toolsmenu',
  'toolmenu',
]
handler.tags = ['main']
handler.command = [
  'listmenu',
  'menulist',
  'aimenu',
  'animereactions',
  'reactions',
  'imagen',
  'textpro',
  'textmaker',
  'logosmaker',
  'imagenai',
  'animemenu',
  'aeditor',
  'audioeditor',
  'infoanime',
  'botmenu',
  'ownermenu',
  'groupmenu',
  'dlmenu',
  'downloads',
  'downloadermenu',
  'economymenu',
  'economy',
  'funmenu',
  'gamemenu',
  'gamesmenu',
  'stickermenu',
  'nsfwmenu',
  'logomenu',
  'makermenu',
  'randompic',
  'randomvid',
  'toolsmenu',
  'toolmenu',
]

export default handler
