const db = require("../../prisma")
const buildCard = require("../../utils/buildCard")
const verifyPayment = require("../../utils/verifyPayment")

const buyHandler = async (req, res) => {
	var { amount, token } = req.body // In paisa
	if (!amount || !token)
		return res.status(400).json({ message: "Missing params" })

	amount = Number(amount)

	const valid = await verifyPayment(amount, token)
	console.log("Validity: ", valid)
	if (!valid)
		return res
			.status(400)
			.json({ message: "Couldnot verify the transaction." })

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
