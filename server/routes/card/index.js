const express = require("express")
const router = express.Router()

const buyHandler = require("./buy")
const infoHandler = require("./balance")
const TxHandler = require("./Tx")

router.post("/buy", buyHandler)
router.get("/info", infoHandler)
router.get("/tx", TxHandler)

module.exports = router
