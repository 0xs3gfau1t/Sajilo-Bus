const express = require("express")
const router = express.Router()

const buyHandler = require("./buy")
const { balanceLoad, balanceEnquiry } = require("./balance")
const TxHandler = require("./Tx")

router.post("/buy", buyHandler)
router.get("/balance", balanceEnquiry)
router.post("/balance", balanceLoad)
router.get("/tx", TxHandler)

module.exports = router
