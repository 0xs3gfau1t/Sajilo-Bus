const db = require("../../prisma")

const approveHandler = async (req, res) => {
	var { id } = req.body
	id = Number(id)

	try {
		const paycheck = await db.paycheck.findUnique({
			where: { id },
			select: {
				requestDate: true,
				bus_number: { select: { bus_number: true, lastPayed: true } },
				payed: true,
				currentBusId: true,
			},
		})

		if (!paycheck) return res.status(400).json({ message: "Invalid id" })

		if (!paycheck.currentBusId)
			return res
				.status(400)
				.json({ message: "This request has already been payed off." })

		// Calculate accumulated money
		const from = paycheck.bus_number.lastPayed
		const to = paycheck.requestDate
		const txs = await db.bus.findUnique({
			where: { bus_number: paycheck.bus_number.bus_number },
			select: {
				transaction: {
					where: { dest_time: { gte: from, lte: to } },
					select: { paid_amount: true },
				},
			},
		})
		const total = txs.transaction.reduce(
			(accum, val) => accum + val.paid_amount,
			0
		)

		const data = await db.paycheck.update({
			where: { id },
			data: {
				currentBus: {
					update: { lastPayed: paycheck.requestDate },
					disconnect: true,
				},
				payed: total,
			},
			select: { payed: true },
		})

		return res
			.status(200)
			.json({ message: `Successfully paid Rs. ${total / 100}.` })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = approveHandler
