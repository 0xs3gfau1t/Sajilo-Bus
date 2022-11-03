const db = require("../../prisma")

const calcHandler = async (req, res) => {
	var { id } = req.query

	if (!id) return res.status(400).json({ message: "Missing id." })

	id = Number(id)

	try {
		const paycheck = await db.paycheck.findUnique({
			where: { id },
			select: {
				requestDate: true,
				bus_number: { select: { bus_number: true, lastPayed: true } },
			},
		})
		if (!paycheck) return res.status(400).json({ message: "Invalid id" })

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

		return res.status(200).json({ total })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = calcHandler
