const { sign, verify } = require("jsonwebtoken")

function generateToken(data, expiresIn) {
	return sign(data, process.env.TOKEN_SECRET, { expiresIn })
}

function verifyToken(token) {
	const data = verify(token, process.env.TOKEN_SECRET)
	return data
}

module.exports = { generateToken, verifyToken }
