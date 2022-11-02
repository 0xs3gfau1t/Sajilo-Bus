const express = require("express")
const router = express.Router()

const loginHandler = require("./login")
const infoHandler = require("./info")
const addHandler = require("./add")
const removeBusHandler = require("./remove")
const TxHandler = require("./Tx")
const listHandler = require("./list")

router.post("/login", loginHandler)
router.get("/info", infoHandler)
router.post("/add", addHandler)
router.delete("/remove", removeBusHandler)
router.get("/tx", TxHandler)
router.get("/list", listHandler)

module.exports = router
