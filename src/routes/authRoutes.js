const express = require("express")
const passport = require("passport")
import * as authController from "../controllers/user/userAuth"
import { isAdmin } from "../middleware/isAdmin"
import { requireSignIn } from "../middleware/isAuth"
import { successResponse } from "../util/responseHandlers"

const router = express.Router()

router.post("/register", authController.register)

router.get("/login", authController.login)

router.get("/protected", requireSignIn, isAdmin, (req, res) => {
  return successResponse(req, res, "This is a protected Route")
})

module.exports = router
