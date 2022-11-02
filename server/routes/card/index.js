const express = require("express")
const router = express.Router()

const buyHandler = require("./buy")

router.post("/buy", buyHandler)

module.exports = router
