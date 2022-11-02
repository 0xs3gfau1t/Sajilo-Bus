const db = require("../../prisma")

const infoHandler = async (req, res) => {
	const { id } = req.query

	try {
		const card = await db.card.findUnique({ where: { id } })
		return res.status(200).json(card)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = infoHandler
