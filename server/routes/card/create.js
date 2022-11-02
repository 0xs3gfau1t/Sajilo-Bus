const db = require("../../prisma")

const createHandler = async (req, res) => {
	const { id, admin } = req.tokenObj

	if (!admin)
		return res
			.status(400)
			.json({ message: "Not priviledged to perform this task." })

	const { quantity } = req.body
	try {
		const cards = await db.card.createMany({
			data: Array.from({ length: quantity }, _ => ({ balance: 9800 })),
		})

		return res
			.status(200)
			.json({ message: `Successfully created ${quantity} cards.` })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = createHandler
