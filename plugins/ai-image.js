import FormData from "form-data";
import Jimp from "jimp";

async function processing(urlPath, method) {
	return new Promise(async (resolve, reject) => {
		let Methods = ["enhance", "recolor", "dehaze"];
		Methods.includes(method) ? (method = method) : (method = Methods[0]);
		let buffer,
			Form = new FormData(),
			scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
		Form.append("model_version", 1, {
			"Content-Transfer-Encoding": "binary",
			contentType: "multipart/form-data; charset=uttf-8",
		});
		Form.append("image", Buffer.from(urlPath), {
			filename: "enhance_image_body.jpg",
			contentType: "image/jpeg",
		});
		Form.submit(
			{
				url: scheme,
				host: "inferenceengine" + ".vyro" + ".ai",
				path: "/" + method,
				protocol: "https:",
				headers: {
					"User-Agent": "okhttp/4.9.3",
					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
				},
			},
			function (err, res) {
				if (err) reject();
				let data = [];
				res
					.on("data", function (chunk, resp) {
						data.push(chunk);
					})
					.on("end", () => {
						resolve(Buffer.concat(data));
					});
				res.on("error", (e) => {
					reject();
				});
			}
		);
	});
}
let handler = async (m, { conn, usedPrefix, command }) => {
	switch (command) {
		case "enhancer":
		case "unblur":
		case "enhance":
			{
				conn.enhancer = conn.enhancer ? conn.enhancer : {};
				if (m.sender in conn.enhancer)
					throw "Warte, bis ein Bild verarbeitet wurde.";
				let q = m.quoted ? m.quoted : m;
				let mime = (q.msg || q).mimetype || q.mediaType || "";
				if (!mime)
					throw `Gib den Befehl zusammen mit dem Bild ein`;
				if (!/image\/(jpe?g|png)/.test(mime))
					throw ` ${mime} wird nicht unterstützt`;
				else conn.enhancer[m.sender] = true;
				m.reply(wait);
				let img = await q.download?.();
				let error;
				try {
					const This = await processing(img, "enhance");
					conn.sendFile(m.chat, This, "qasim.img", maker, m);
				} catch (er) {
					error = true;
				} finally {
					if (error) {
						m.reply("Verbindung zum Server unterbrochen");
					}
					delete conn.enhancer[m.sender];
				}
			}
			break;
		case "colorize":
		case "colorizer":
			{
				conn.recolor = conn.recolor ? conn.recolor : {};
				if (m.sender in conn.recolor)
					throw "Warte, bis ein Bild verarbeitet wurde";
				let q = m.quoted ? m.quoted : m;
				let mime = (q.msg || q).mimetype || q.mediaType || "";
				if (!mime)
					throw `Gib den Befehl zusammen mit dem Bild ein`;
				if (!/image\/(jpe?g|png)/.test(mime))
					throw `${mime} ist nicht bearbeitbar`;
				else conn.recolor[m.sender] = true;
				m.reply(wait);
				let img = await q.download?.();
				let error;
				try {
					const This = await processing(img, "enhance");
					conn.sendFile(m.chat, This, "qasim.img", maker, m);
				} catch (er) {
					error = true;
				} finally {
					if (error) {
						m.reply("Verbindung zum Server unterbrochen");
					}
					delete conn.recolor[m.chat];
				}
			}
			break;
		case "hd":
		case "hdr":
			{
				conn.hdr = conn.hdr ? conn.hdr : {};
				if (m.sender in conn.hdr)
					throw "Warte, bis ein Bild verarbeitet wurde, dann füge ein weiteres hinzu";
				let q = m.quoted ? m.quoted : m;
				let mime = (q.msg || q).mimetype || q.mediaType || "";
				if (!mime)
					throw `Gib den Befehl zusammen mit dem Bild ein`;
				if (!/image\/(jpe?g|png)/.test(mime))
					throw `${mime} ist nicht bearbeitbar`;
				else conn.hdr[m.sender] = true;
				m.reply(wait);
				let img = await q.download?.();
				let error;
				try {
					const This = await processing(img, "enhance");
					conn.sendFile(m.chat, This, "qasim.img", maker, m);
				} catch (er) {
					error = true;
				} finally {
					if (error) {
						m.reply("Serververbindung unterbrochen");
					}
					delete conn.hdr[m.sender];
				}
			}
			break;
	}
};
handler.help = ['hd', 'hdr', 'unblur', 'remblur', 'colorize', 'colorizer', 'enhance', 'enhancer','dehaze','recolor' ,'enhance']
handler.tags = ["image", "maker"];
handler.command = ['hd', 'hdr', 'unblur', 'remblur', 'colorize', 'colorizer', 'enhance', 'enhancer','dehaze','recolor' ,'enhance']
export default handler;


