const { hash } = require("bcrypt")
const db = require("../../prisma")

const registerHandler = async (req, res) => {
	const { username, password } = req.body

	if (!username || !password)
		return res
			.status(400)
			.json({ message: "Username and password must be provided." })

	try {
		const hashedPassword = await hash(password, 10)

		const admin = await db.admin.create({
			data: { username, password: hashedPassword },
			select: { id: true },
		})

		return res.status(200).json({
			id: admin.id,
			message: "Admin account created successfully.",
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}
