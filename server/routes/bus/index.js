const express = require("express")
const router = express.Router()

const loginHandler = require("./login")
const infoHandler = require("./info")

router.post("/login", loginHandler)
router.get("/info")

module.exports = router
