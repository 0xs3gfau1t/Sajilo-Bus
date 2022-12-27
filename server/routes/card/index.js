const express = require("express")
const router = express.Router()

const authenticator = require("../../middlewares/authenticate")

const buyHandler = require("./buy")
const { balanceLoad, balanceEnquiry } = require("./balance")
const TxHandler = require("./Tx")
const createHandler = require("./create")
const discardHandler = require("./discard")
const beginTripHandler = require("./beginTrip")
const endTripHandler = require("./endTrip")
const listHandler = require('./list')
const TripHandler = require("./trip")


router.post("/buy", buyHandler)
router.post("/create", authenticator, createHandler)

router.get("/balance", balanceEnquiry)
router.post("/balance", balanceLoad)

router.delete("/discard", discardHandler)

router.post("/beginTrip", beginTripHandler)
router.post("/endTrip", endTripHandler)
router.post("/trip", TripHandler)

router.get("/list", authenticator, listHandler)
router.get("/tx", TxHandler)

module.exports = router
