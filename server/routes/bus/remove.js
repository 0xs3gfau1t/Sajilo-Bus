const db = require("../../prisma")

const removeBusHandler = async (req, res) => {
	const { id, admin } = req.tokenObj

	if (!admin)
		return res
			.status(400)
			.json({ message: "Not privileged to perform this task." })

	const { bus_number } = req.body

	if (!bus_number)
		return res.status(400).json({ message: "Missing bus number." })

	try {
		const bus = await db.bus.delete({
			where: { bus_number },
			select: { bus_number: true },
		})

		if (!bus)
			return res.status(400).json({ message: "Invalid bus number." })

		return res
			.status(200)
			.json({ message: "Successfully remove bus user." })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = removeBusHandler
