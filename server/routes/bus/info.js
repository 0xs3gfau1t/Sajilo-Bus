const db = require("../../prisma")

const infoHandler = async (req, res) => {
	const { id, admin } = req.tokenObj

	const bus_number = admin ? req.query.bus_number : id

	if (!bus_number)
		return res.status(400).json({ message: "Missing bus number." })

	try {
		const data = await db.bus.findUnique({
			where: { bus_number },
			select: {
				bus_number: true,
				owner_name: true,
				ph_number: true,
				email: true,
			},
		})

		if (!data)
			return res.status(400).json({ message: "Invalid bus number." })

		return res.status(200).json(data)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = infoHandler
