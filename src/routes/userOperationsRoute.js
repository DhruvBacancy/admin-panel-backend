const express = require("express")

import * as userOperations from "../controllers/user/userOperations"
import {
  validaetUUID,
  validateUpdateUser,
} from "../helpers/userOperationsValidations"
import { isAdmin } from "../middleware/isAdmin"
import { requireSignIn } from "../middleware/isAuth"

const router = express.Router()

router.get("/", requireSignIn, isAdmin, userOperations.getAllUsers)
router.get(
  "/:id",
  requireSignIn,
  isAdmin,
  validaetUUID,
  userOperations.getUserById
)
router.patch(
  "/edit/:id",
  requireSignIn,
  isAdmin,
  validaetUUID,
  validateUpdateUser,
  userOperations.editUserById
)
router.delete(
  "/delete/:id",
  requireSignIn,
  isAdmin,
  validaetUUID,
  userOperations.deleteUserById
)

module.exports = router
