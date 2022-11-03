const axios = require("axios")

const verifyPayment = async (amount, token) => {
	console.log({ amount, token })
	try {
		var config = {
			method: "post",
			url: "https://khalti.com/api/v2/payment/verify/",
			headers: {
				"Authorization": `Key ${process.env.KHALTI_SECRET}`,
				"Content-Type": "application/json",
			},
			data: { amount: Number(amount), token },
		}
		const response = await axios(config)
			.then(res => {
				console.log("Success", res.data)
				return true
			})
			.catch(err => {
				console.log("Error", err.response.data)
				return false
			})

		return response
	} catch (err) {
		console.error(err)
		return false
	}
}

module.exports = verifyPayment
