const db = require("../../prisma")

const discardHandler = async (req, res) => {
	const { id } = req.query

	try {
		await db.card.delete({ where: { id } })

		return res.status(200).json({ message: "Card discarded." })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}
