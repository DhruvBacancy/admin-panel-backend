const express = require("express")
const passport = require("passport")
import * as authController from "../controllers/user/userAuth"

const router = express.Router()

router.post("/register", authController.register)
router.post("/login", authController.login)
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "This is a protected route", user: req.user })
  }
)

module.exports = router
