const db = require("../../prisma")

const requestHandler = async (req, res) => {
	const { bus_number } = req.body

	if (!bus_number)
		return res.status(400).json({ message: "Missing bus number." })

	try {
		const bus = await db.bus.findUnique({
			where: { bus_number },
			select: { pendingPayCheck: { select: { id: true } } },
		})

		if (!bus) return res.status(400).json({ message: "Invalid bus." })

		var data
		if (bus.pendingPayCheck) {
			data = await db.bus.update({
				where: { bus_number },
				data: {
					pendingPayCheck: {
						update: {
							requestDate: new Date(),
						},
					},
				},
				select: { pendingPayCheck: { select: { id: true } } },
			})
		} else {
			data = await db.bus.update({
				where: { bus_number },
				data: {
					pendingPayCheck: {
						create: { bus_number: { connect: { bus_number } } },
					},
				},
				select: { pendingPayCheck: { select: { id: true } } },
			})
		}
		return res.status(200).json({
			message: "Requested for paycheck.",
			id: data.pendingPayCheck.id,
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = requestHandler
