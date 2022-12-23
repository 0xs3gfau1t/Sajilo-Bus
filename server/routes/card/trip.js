const db = require("../../prisma")
const TripHandler = async (req, res) => {
	console.log(req.body)
	var {
		src_lon,
		src_lat,
		dest_lon,
		dest_lat,
		source_time,
		dest_time,
		cardId,
		Bus_number,
		distance,
	} = req.body

	try {
		distance = Number(distance)
		var paid_amount = 0
		paid_amount += 20 * 100
		distance -= 3
		distance = Math.max(0, distance)
		paid_amount += distance * 5 * 100
		paid_amount = Math.floor(paid_amount)

		await db.card.update({
			where: { id: cardId },
			data: {
				balance: { decrement: paid_amount },
				transactions: {
					create: {
						src_lon,
						src_lat,
						dest_lon,
						dest_lat,
						source_time: new Date(source_time),
						dest_time: new Date(dest_time),
						paid_amount,
						Bus_number,
					},
				},
			},
		})
		return res
			.status(200)
			.json({ message: `Trip success. Paid ${paid_amount}` })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = TripHandler
