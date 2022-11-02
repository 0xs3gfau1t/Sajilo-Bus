const db = require("../../prisma")

const TxHandler = async (req, res) => {
	var { id, skip, take } = req.query

	try {
		const data = await db.card.findUnique({
			where: { id },
			select: { transactions: { skip, take } },
		})

		return res.status(200).json({ transaction: data.transactions })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = TxHandler
