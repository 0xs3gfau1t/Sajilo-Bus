const QRCode = require("qrcode-svg")

const buildCard = data => {
	const svg = new QRCode({
		content: data,
		width: 200,
		height: 200,
		color: "#000000",
		background: "#00000000",
		ecl: "H",
		padding: 8,
		xmlDeclaration: false,
		pretty: false,
		join: true,
		predefined: false,
		container: "none",
	}).svg()

	const fs = require("fs")
	const card = fs.readFileSync(__dirname + "/card.svg").toString()
	return card.replace("<!-- REPLACE ME -->", svg)
}

module.exports = buildCard
