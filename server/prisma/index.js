const { PrismaClient } = require("@prisma/client")

const db = global.db || new PrismaClient()

if (process.env.NODE_ENV !== "production") global.db = db

module.exports = db
