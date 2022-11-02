require("dotenv").config({ path: __dirname + "/.env" })

// Imports
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

// Initialization
const app = express()

// Middlewares
app.use(cors({ credentials: true }))
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
)
app.use(cookieParser())

app.get("/api", (req, res) => {
	return res.send("Hi")
})

// App startup
let host = process.env.HOST || "localhost"
let port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`\nBackend Server\nHost: ${host}\nPort: ${port}\n`)
})
