const axios = require("axios")

const verifyPayment = async (amount, token) => {
	try {
		var config = {
			method: "post",
			url: "https://khalti.com/api/v2/payment/verify/",
			headers: {
				"Authorization":
					"Key test_secret_key_287d4dad492c439ebc9ddb1d8f3ab15d",
				"Content-Type": "application/json",
			},
			data: { amount, token },
		}
		const response = await axios(config)
			.then(res => {
				// console.log("Success", res.data)
				return true
			})
			.catch(err => {
				// console.log("Error", err)
				return false
			})

		return response
	} catch (err) {
		console.error(err)
		return false
	}
}

module.exports = verifyPayment
