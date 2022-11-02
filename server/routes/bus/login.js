const { compare } = require("bcrypt")
const db = require("../../prisma")

const loginHandler = async (req, res) => {
	const { bus_number, password } = req.body
	if (!bus_number || !password)
		return res
			.status(400)
			.json({ message: "Bus number and password must be provided." })
	try {
		const bus = await db.bus.findUnique({ where: { bus_number } })

		if (!compare(password, bus.password))
			return res.status(400).json({ message: "Invalid password." })

		return res.status(200).json({
			user: bus_number,
			message: "Logged in successfully.",
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.export = loginHandler
