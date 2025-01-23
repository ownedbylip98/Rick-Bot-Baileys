import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, args, command }) => {
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else {
        throw "Bitte gib einen Text an oder antworte auf eine Nachricht mit dem Text, den du zitieren möchtest!";
    }

    try {
        // Create the quote
        let quote = await createQuote(m.name, text);

        // Define caption for the generated quote image
        let maker = "*Dein Zitat wurde erstellt!*"; 

        // Send the generated quote image with a caption
        await conn.sendFile(m.chat, quote, '', maker + "\n*Angefordert von:* " + m.name + "\n*Zitat:* " + text, m);
    } catch (error) {
        console.error("Fehler beim Erstellen des Zitats:", error);
        m.reply("⚠️ Ein Fehler ist beim Erstellen des Zitats aufgetreten. Bitte versuche es später erneut.");
    }
}

handler.tags = ["maker"];
handler.command = handler.help = ["quozio", "qmkr"];

export default handler;

async function createQuote(author, message) {
    const host = "https://quozio.com/";
    let path = "";

    try {
        // Submit the quote
        path = "api/v1/quotes";
        const body = JSON.stringify({
            author: author,
            quote: message,
        });

        const quote = await fetch(host + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        }).then((val) => val.json());

        console.log("Zitat erstellt unter: " + quote["url"], "quote");
        const quoteId = quote["quoteId"];

        // Fetch the templates
        path = "api/v1/templates";
        const templates = await fetch(host + path)
            .then((val) => val.json())
            .then((val) => val["data"]);

        const index = Math.floor(Math.random() * templates.length);
        console.log("Vorlage ausgewählt von: " + templates[index]["url"], "quote");
        const templateId = templates[index]["templateId"];

        // Apply the template to the quote
        path = `api/v1/quotes/${quoteId}/imageUrls?templateId=${templateId}`;
        const imageUrl = await fetch(host + path)
            .then((val) => val.json())
            .then((val) => val["medium"]);
        console.log("Zitatbild erstellt unter: " + imageUrl, "quote");

        // Return the generated image URL
        return imageUrl;

    } catch (error) {
        console.error("Fehler beim Erstellen des Zitats:", error);
        throw "Es gab ein Problem beim Erstellen des Zitats.";
    }
}
