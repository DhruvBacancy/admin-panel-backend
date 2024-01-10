const express = require("express")

const router = express.Router()

const authRoutes = require("./authRoutes")
const userOperations = require("./userOperationsRoute")

router.use("/auth", authRoutes)
router.use("/user", userOperations)

module.exports = router
