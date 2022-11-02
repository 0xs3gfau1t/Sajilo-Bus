const { compare } = require("bcrypt")
const db = require("../../prisma")

const infoHandler = async (req, res) => {
	const { id } = req.query
	if (!id) return res.status(400).json({ message: "Missing card number." })

	try {
		const data = await db.bus.findUnique({ where: { bus_number } })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}
