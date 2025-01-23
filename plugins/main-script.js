import { promises } from 'fs'
import { join } from 'path'
import axios from 'axios'

let handler = async function (m, { conn, __dirname }) {
  const githubRepoURL = 'https://github.com/OwnedbyLIP/Rick-Bot'

  try {
    const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/)

    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`)

    if (response.status === 200) {
      const repoData = response.data

      // Format the repository information with emojis
      const formattedInfo = `
📂 Repository Name: ${repoData.name}
📝 Beschreibung: ${repoData.description}
👤 Besitzer: ${repoData.owner.login}
⭐ Sterne: ${repoData.stargazers_count}
🍴 Forks: ${repoData.forks_count}
🌐 URL: ${repoData.html_url}
      `.trim()

      // Send the formatted information as a message
      await conn.relayMessage(
        m.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: 'INR',
            amount1000: 69000,
            requestFrom: m.sender,
            noteMessage: {
              extendedTextMessage: {
                text: formattedInfo,
                contextInfo: {
                  externalAdReply: {
                    showAdAttribution: true,
                  },
                },
              },
            },
          },
        },
        {}
      )
    } else {
      // Handle the case where the API request fails
      await conn.reply(m.chat, 'Repository-Informationen konnten nicht abgerufen werden.', m)
    }
  } catch (error) {
    console.error(error)
    await conn.reply(m.chat, 'Beim Abrufen der Repository-Informationen ist ein Fehler aufgetreten.', m)
  }
}

handler.help = ['script']
handler.tags = ['main']
handler.command = ['sc', 'repo', 'script']

export default handler
