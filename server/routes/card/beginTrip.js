const db = require("../../prisma")

const beginHandler = async (req, res) => {
	const { lon, lat, bus_number, id } = req.body

	try {
		const card = await db.card.findUnique({
			where: { id },
			select: { currentTX: { select: { id: true } } },
		})

		if (card.currentTX)
			return res.status(400).json({ message: "Previous trip not ended." })

		const { id: txID } = await db.card.update({
			where: { id },
			data: {
				currentTX: {
					create: {
						src_lat: Number(lat),
						src_lon: Number(lon),
						bus: { connect: { bus_number } },
					},
				},
			},
			select: { id: true },
		})
		return res.status(200).json({ id: txID, message: "Trip started." })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}
