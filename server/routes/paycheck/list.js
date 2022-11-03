const db = require("../../prisma")

const listHandler = async (req, res) => {
	var { skip = 0, take = 10 } = req.body
	skip = Number(skip)
	take = Number(take)

	try {
		const data = await db.paycheck.findMany({
			where: { payed: 0 },
			select: {
				id: true,
				busBus_number: true,
				requestDate: true,
				payed: true,
			},
			orderBy: { requestDate: "asc" },
			skip,
			take,
		})
		return res.status(200).json(data)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = listHandler
