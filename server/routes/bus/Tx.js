const db = require("../../prisma")

const TxHandler = async (req, res) => {
	const { bus_number, skip, take } = req.query

	try {
		const data = await db.bus.findUnique({
			where: { bus_number },
			select: { transaction: { skip, take } },
		})

		return res.status(200).json(data)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = TxHandler
