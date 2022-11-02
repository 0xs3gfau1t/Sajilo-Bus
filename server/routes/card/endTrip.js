const db = require("../../prisma")

const endHandler = async (req, res) => {
	const { lon, lat, bus_number, id } = req.body

	try {
		const card = await db.card.findUnique({
			where: { id },
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
