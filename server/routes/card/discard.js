const db = require("../../prisma")

const discardHandler = async (req, res) => {
	const { id } = req.body

	try {
		const card = await db.card.delete({ where: { id } })

		if (!card) return res.status(400).json({ message: "Invalid card." })

		return res.status(200).json({ message: "Card discarded." })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = discardHandler
