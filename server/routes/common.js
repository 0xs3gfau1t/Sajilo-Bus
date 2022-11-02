const express = require("express")
const router = express.Router()

const authenticator = require("../middlewares/authenticate")

router.get("/verifyidentity", authenticator, (req, res) => {
	const { admin } = req.query

	if (
		(admin === "true" && req.tokenObj.admin) ||
		(admin != "true" && !req.tokenObj.admin)
	) {
		return res.status(200).json({
			message: "Logged in",
			user: req.tokenObj.admin ?? req.tokenObj.id,
		})
	}

	return res.status(400).json({ message: "Not logged in" })
})

router.get("/logout", authenticator, (req, res) => {
	res.clearCookie("token")

	res.send({ "message": "Logout Successful" })
})

module.exports = router
