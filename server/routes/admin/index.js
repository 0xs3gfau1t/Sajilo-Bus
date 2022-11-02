const express = require("express")
const router = express.Router()

const registerHandler = require("./register")

router.post("/register", registerHandler)

module.exports = router
