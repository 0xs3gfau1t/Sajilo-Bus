const db = require("../../prisma")

const endTripHandler = async (req, res) => {
	const { lon, lat, bus_number, id } = req.body

	if (!lon || !lat || !bus_number || !id)
		return res.status(400).json({ message: "One of the field is missing." })

	try {
		const card = await db.card.findUnique({
			where: { id },
			select: {
				currentTX: {
					select: {
						id: true,
						Bus_number: true,
						src_lat: true,
						src_lon: true,
						source_time: true,
					},
				},
			},
		})

		if (!card) return res.status(400).json({ message: "Invalid card." })

		if (!card.currentTX)
			return res.status(400).json({ message: "Trip not started yet." })

		if (bus_number != card.currentTX.Bus_number)
			return res.status(400).json({
				message: "Not the same bus that you started your trip on.",
			})

		// [TODO] A proper way to calculate the fare amount.
		const cost = 100

		await db.transaction.update({
			where: { id: card.currentTX.id },
			data: {
				dest_lat: Number(lat),
				dest_lon: Number(lon),
				dest_time: new Date(),
				card: {
					connect: { id },
					update: { balance: { decrement: cost } },
				},
				currentCard: { disconnect: true },
				paid_amount: cost,
			},
		})
		return res.status(200).json({ message: "Trip ended." })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = endTripHandler
