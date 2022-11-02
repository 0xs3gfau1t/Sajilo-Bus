const { sign } = require("jsonwebtoken")

function generateToken(data, expiresIn) {
	return sign(data, process.env.TOKEN_SECRET, { expiresIn })
}

module.exports = { generateToken }
