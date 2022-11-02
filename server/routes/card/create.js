const db = require("../../prisma")

const createHandler = async (req, res) => {
	const { quantity } = req.body

	try {
		const cards = await db.card.createMany({
			data: Array.from({ length: quantity }, _ => ({ balance: 9800 })),
		})

		console.log(cards)

		return res.status(200).json({ message: "Success" })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = createHandler
