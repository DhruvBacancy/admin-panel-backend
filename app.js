const express = require("express")
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

