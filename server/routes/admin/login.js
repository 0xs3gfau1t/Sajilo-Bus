const { compare } = require("bcrypt")
const db = require("../../prisma")
const { generateToken } = require("../../utils/jwt")

const loginHandler = async (req, res) => {
	const { username, password } = req.body

	if (!username || !password)
		return res
			.status(400)
			.json({ message: "Username and password must be provided." })

	try {
		const admin = await db.admin.findUnique({
			where: { username: username },
		})

		if (!admin)
			return res.status(400).json({ message: "Invalid username." })

		if (!compare(password, admin.password))
			return res.status(400).json({ message: "Invalid password." })

		const tokenData = { id: admin.id, admin: true }
		const token = generateToken(tokenData, "2d")

		res.cookie("token", token, { httpOnly: true })

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

module.exports = loginHandler
