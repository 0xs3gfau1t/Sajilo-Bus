const verifyPayment = async (token, amount) => {
	try {
		const response = await fetch(
			"https://khalti.com/api/v2/payment/verify/",
			{
				method: "POST",
				headers: { Authorization: `Key ${process.env.KHALTI_KEY}` },
				body: { amount, token },
			}
		)
		console.log(response)
		return true
	} catch (err) {
		console.error(err)
		return false
	}
}

module.exports = verifyPayment
