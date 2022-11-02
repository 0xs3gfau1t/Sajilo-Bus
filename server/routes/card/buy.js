const db = require("../../prisma")
const buildCard = require("../../utils/buildCard")

const buyHandler = async (req, res) => {
	var { amount } = req.body // In paisa
	amount = Number(amount)

	if (amount < 10000)
		return res.status(400).json({ message: "Insufficient amount." })

	try {
		const card = await db.card.create({ data: { balance: amount } })

		if (!card) return res.status(400).json({ message: "Invalid card id." })
		return res.status(200).send(buildCard(card.id))
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = buyHandler
