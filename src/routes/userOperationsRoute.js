const express = require("express")

import * as userOperations from "../controllers/user/userOperations"
import { isAdmin } from "../middleware/isAdmin"
import { requireSignIn } from "../middleware/isAuth"

const router = express.Router()

router.get("/", requireSignIn, isAdmin, userOperations.getAllUsers)
router.get("/:id", requireSignIn, isAdmin, userOperations.getUserById)
router.patch("/edit/:id", requireSignIn, isAdmin, userOperations.editUserById)
router.delete(
  "/delete/:id",
  requireSignIn,
  isAdmin,
  userOperations.deleteUserById
)

module.exports = router
