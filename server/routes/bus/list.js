const db = require("../../prisma")

const listHandler = async (req, res) => {
	var { skip, take } = req.query

	try {
		const data = await db.bus.findMany({ where: {}, skip, take })
		return res.status(200).json(data)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = listHandler
