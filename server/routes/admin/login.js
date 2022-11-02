const { compare } = require("bcrypt")
const db = require("../../prisma")

const loginHandler = async (req, res) => {
	const { username, password } = req.body
	try {
		const admin = await db.admin.findUnique({ where: { username } })
		if (!compare(password, admin.password))
			return res.status(400).json({ message: "Invalid password." })

		return res.status(200).json({
			id: admin.id,
			user: username,
			message: "Logged in successfully.",
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.export = loginHandler
