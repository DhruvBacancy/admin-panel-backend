const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require("uuid")

const User = require("../../models/user.js")
const sequelize = require("../../config/sequelize-dbconnect.js")
import { Sequelize } from "sequelize"
import { errorResponse, successResponse } from "../../util/responseHandlers.js"

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User(sequelize, Sequelize.DataTypes).create({
      id: uuidv4(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      role,
    })
    return successResponse(req, res, "Registration Successful")
  } catch (error) {
    console.log(error.message)
    const errorMessage = error.message
    return errorResponse(req, res, 500, errorMessage)
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User(sequelize, Sequelize.DataTypes).findOne({
      where: { email },
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return errorResponse(req, res, 401, "Invalid credentials")
    }

    const expiresIn = process.env.JWT_EXPIRATION_TIME
    const payload = { id: user.id, role: user.role }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
    return successResponse(req, res, { token, role: user.role, id: user.id })
  } catch (error) {
    console.error(error)
    const errorMessage = error.message
    return errorResponse(req, res, 500, errorMessage)
  }
}
