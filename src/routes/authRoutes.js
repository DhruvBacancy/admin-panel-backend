const express = require("express")
import * as authController from "../controllers/user/userAuth"
import { validateLogin, validateRegistration } from "../helpers/authValidations"

const router = express.Router()

router.post("/register", validateRegistration, authController.register)

router.get("/login", validateLogin, authController.login)

module.exports = router
