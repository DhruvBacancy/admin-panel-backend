const express = require("express")
const dotenv = require("dotenv")
const http = require("http")
const cors = require("cors")
const bodyParser = require("body-parser")
const passport = require("passport")

require("dotenv").config()
require("./src/config/sequelize-dbconnect")

const app = express()
const server = http.createServer(app)

app.use(cors())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(passport.initialize())

app.use(bodyParser.json())

module.exports = server
