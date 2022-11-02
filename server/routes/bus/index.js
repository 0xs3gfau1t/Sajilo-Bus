const express = require("express")
const router = express.Router()

const authenticator = require("../../middlewares/authenticate")

const loginHandler = require("./login")
const infoHandler = require("./info")
const addHandler = require("./add")
const removeBusHandler = require("./remove")
const TxHandler = require("./Tx")
const listHandler = require("./list")
const updateHandler = require("./update")

router.post("/login", loginHandler)

router.get("/", authenticator, infoHandler)
router.post("/", authenticator, addHandler)
router.delete("/", authenticator, removeBusHandler)
router.patch("/", authenticator, updateHandler)

router.get("/tx", authenticator, TxHandler)
router.get("/list", authenticator, listHandler)

module.exports = router
