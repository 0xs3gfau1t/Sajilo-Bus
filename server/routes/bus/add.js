const db = require("../../prisma")
const { hash } = require("bcrypt")

const addBusHandler = async (req, res) => {
	const { id, admin } = req.tokenObj

	if (!admin)
		return res
			.status(400)
			.json({ message: "Not privileged to perform this task." })

	const { bus_number, owner_name, ph_number, email, password } = req.body

	if (!bus_number || !owner_name || !ph_number || !email || !password)
		return res.status(400).json({ message: "One of the field is missing." })

	const hashedPassword = await hash(password)

	try {
		await db.bus.create({
			data: {
				bus_number,
				owner_name,
				ph_number,
				email,
				password: hashedPassword,
			},
		})

		return res.status(200).json({ message: "Successfully added bus user." })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = addBusHandler
