const express = require("express")
const router = express.Router()

const loginHandler = require("./login")

router.post("/login", loginHandler)

module.exports = router
