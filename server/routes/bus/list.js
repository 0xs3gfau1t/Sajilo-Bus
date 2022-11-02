const db = require("../../prisma")

const listHandler = async (req, res) => {
	const { id, admin } = req.tokenObj

	if (!admin)
		return res
			.status(400)
			.json({ message: "Not privileged to perform this task." })

	var { skip = 0, take = 10 } = req.query
	skip = Number(skip)
	take = Number(take)

	try {
		const data = await db.bus.findMany({
			where: {},
			select: {
				bus_number: true,
				owner_name: true,
				ph_number: true,
				email: true,
			},
			skip,
			take,
		})
		const formattedData = data.reduce(
			(accum, value) => ({
				...accum,
				[value.bus_number]: {
					owner_name: value.owner_name,
					ph_number: value.ph_number,
					email: value.email,
				},
			}),
			{}
		)
		return res.status(200).json(formattedData)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something went wrong." })
	}
}

module.exports = listHandler
