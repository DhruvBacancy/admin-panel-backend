const User = require("../../models/user.js")
const sequelize = require("../../config/sequelize-dbconnect.js")
import { Sequelize } from "sequelize"
import { errorResponse, successResponse } from "../../util/responseHandlers.js"

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User(sequelize, Sequelize.DataTypes).findAll({
      where: {
        role: "user",
      },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    })
    return successResponse(req, res, { allUsers })
  } catch (error) {
    console.log(error.message)
    const errorMessage = error.message
    return errorResponse(req, res, 500, errorMessage)
  }
}

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User(sequelize, Sequelize.DataTypes).findOne({
      where: {
        id,
        role: "user",
      },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    })
    return successResponse(req, res, { user })
  } catch (error) {
    console.log(error.message)
    const errorMessage = error.message
    return errorResponse(req, res, 500, errorMessage)
  }
}

exports.editUserById = async (req, res) => {
  try {
    const { id } = req.params
    const { firstName, lastName, email, role } = req.body
    const updatedUser = await User(sequelize, Sequelize.DataTypes).update(
      { firstName, lastName, email, role },
      { where: { id } }
    )
    return successResponse(req, res, { updatedUser })
  } catch (error) {
    console.log(error.message)
    const errorMessage = error.message
    return errorResponse(req, res, 500, errorMessage)
  }
}

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params
    const deletedUser = await await User(
      sequelize,
      Sequelize.DataTypes
    ).destroy({
      where: { id },
    })
    return successResponse(req, res, { deletedUser })
  } catch (error) {
    console.log(error.message)
    const errorMessage = error.message
    return errorResponse(req, res, 500, errorMessage)
  }
}
