const express = require("express")
import * as authController from "../controllers/user/userAuth"

const router = express.Router()

router.post("/register", authController.register)

router.get("/login", authController.login)

module.exports = router
