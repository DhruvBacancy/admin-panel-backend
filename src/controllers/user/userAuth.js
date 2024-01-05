const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require("uuid")
const User = require("../../models/user.js")
const sequelize = require("../../config/sequelize-dbconnect.js")
import { Sequelize } from "sequelize"

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
    res.json({ id, email, firstName, lastName, role })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User(sequelize, Sequelize.DataTypes).findOne({
      where: { email },
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Invalid credentials" })
      return
    }

    const payload = { id: user.id, role: user.role }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
