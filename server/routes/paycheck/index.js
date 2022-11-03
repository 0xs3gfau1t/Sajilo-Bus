const express = require("express")
const router = express.Router()

const listHandler = require("./list")
const requestHandler = require("./request")
const approveHandler = require("./approve")
const calcHandler = require("./calc")

router.get("/list", listHandler)
router.get("/calc", calcHandler)
router.post("/request", requestHandler)
router.post("/approve", approveHandler)

module.exports = router
