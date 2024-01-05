const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser")
const passport = require("passport")
import authRoutes  from "./src/routes/api"

require("dotenv").config()
require("./src/config/sequelize-dbconnect")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(passport.initialize())

app.use("/auth", authRoutes)

app.listen(process.env.APP_PORT, () => {
  console.log("App Listening at:", process.env.APP_PORT)
})
