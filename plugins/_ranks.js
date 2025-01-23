global.rpg = {
  role(level) {
    level = parseInt(level)
    if (isNaN(level)) return { name: '', level: '' }

    const role = [
      { name: 'Gerry', level: 0 },
      { name: 'Summer', level: 5 }, //»»————⍟——««\n
      { name: 'Beth', level: 10 },
      { name: 'Morty', level: 15 },
      { name: 'Böser Morty', level: 20 },
      { name: 'VogelMensch', level: 25 }, //𐏓・,〔𒁷, 𒆜〢
      { name: 'Lehrer Rick', level: 30 },
      { name: 'Pensionierter General Rick', level: 35 },
      { name: 'Doofus Rick', level: 40 },
      { name: 'Gurken Rick', level: 45 },
      { name: 'Mini Rick', level: 50 },
      { name: 'Toxischer Rick', level: 60 },
      { name: 'Gesunder Rick', level: 70 },
      { name: 'Böser Rick', level: 80 },
      { name: 'Rick Prime', level: 90 },
      { name: 'Der Rickeste Rick', level: 100 },
    ]

    return role.reverse().find(role => level >= role.level)
  },
}
