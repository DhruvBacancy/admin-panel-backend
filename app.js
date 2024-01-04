const express = require('express')
const dotenv = require('dotenv')
const http = require('http');

require('dotenv').config();
require('./config/sequelize-dbconnect')

const app = express()
const server = http.createServer(app);

module.exports = server;
