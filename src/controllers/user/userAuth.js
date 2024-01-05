const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User } = require("../../models")

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ username, password: hashedPassword })
    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Invalid credentials" })
      return
    }

    const payload = { sub: user.id }
    const token = jwt.sign(payload, "your-secret-key")
    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
