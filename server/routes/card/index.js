const express = require("express")
const router = express.Router()

const buyHandler = require("./buy")
const infoHandler = require("./info")

router.post("/buy", buyHandler)
router.get("/info", infoHandler)

module.exports = router
