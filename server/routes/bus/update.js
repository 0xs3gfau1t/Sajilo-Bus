const db = require("../../prisma")

const updateHandler = async (req, res) => {
	const { bus_number, owner_name, ph_number, email, password } = req.body

	var updatingData = {}

	if (owner_name) updatingData.owner_name = owner_name
	if (ph_number) updatingData.ph_number = ph_number
	if (email) updatingData.email = email
	if (password) updatingData.password = await hash(password, 10)

	try {
		await db.bus.update({ where: { bus_number }, data: updatingData })
		return res.status(200).json({ message: "Updated" })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}
