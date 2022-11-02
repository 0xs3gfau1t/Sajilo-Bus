const express = require("express")
const router = express.Router()

const registerHandler = require("./register")
const loginHandler = require("./login")

router.post("/register", registerHandler)
router.post("/login", loginHandler)

module.exports = router
