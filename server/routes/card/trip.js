const db = require("../../prisma")
const distance = require("../../utils/distance")
const TripHandler = async (req, res) => {
	var {
		src_lon,
		src_lat,
		dest_lon,
		dest_lat,
		source_time,
		dest_time,
		cardId,
		Bus_number,
	} = req.body

	try {
		const paid_amount =
			400 *
			Math.floor(
				distance({
					lat1: src_lat,
					lon1: src_lon,
					lat2: dest_lat,
					lon2: dest_lon,
				})
			)
		await db.card.update({
			where: { id: cardId },
			data: {
				transactions: {
					create: {
						src_lon,
						src_lat,
						dest_lon,
						dest_lat,
						source_time,
						dest_time,
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
