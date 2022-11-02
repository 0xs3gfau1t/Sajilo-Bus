const db = require("../../prisma")

const TxHandler = async (req, res) => {
	var { id, skip = 0, take = 10 } = req.query

	if (!id) return res.status(400).json({ message: "Missing card id." })

	skip = Number(skip)
	take = Number(take)

	try {
		const data = await db.card.findUnique({
			where: { id },
			select: { transactions: { skip, take } },
		})

		if (!data) return res.status(400).json({ message: "Invalid card." })

		return res.status(200).json({ transaction: data.transactions })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = TxHandler
