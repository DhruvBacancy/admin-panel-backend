const express = require("express")
const passport = require("passport")
import * as authController from "../controllers/user/userAuth"
import { isAuthenticated } from "../middleware/isAuth"

const router = express.Router()

router.post("/register", authController.register)
router.get("/login", authController.login)
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }, isAuthenticated),
  (req, res) => {
    console.log(req.user.id, req.user.role)
    res.json({ message: "This is a protected route" })
  }
)

module.exports = router
