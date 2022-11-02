const { verifyToken } = require("../utils/jwt")

const authenticator = (req, res, next) => {
	const { token } = req.cookies

	const data = verifyToken(token)

	req.tokenObj = data

	return next()
}
