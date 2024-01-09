const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const passport = require("passport")
const User = require("../models/user")
const sequelize = require("../config/sequelize-dbconnect")
const { Sequelize } = require("sequelize")
const { errorResponse } = require("../util/responseHandlers")
const secret = process.env.JWT_SECRET

const opts = {
  jwtFromRequest: ExtractJwt.fromHeader("x-token"),
  secretOrKey: secret,
}

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User(sequelize, Sequelize.DataTypes)
      .findOne({ where: { id: jwt_payload.id } })
      .then((user) => {
        if (user) {
          return done(null, { id: user.id, role: user.role })
        } else {
          return done(null, false)
        }
      })
      .catch((err) => {
        console.log(err)
        return done(err, false)
      })
  })
)

exports.requireSignIn = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user) {
      const errorMessage = info.message
      return errorResponse(req, res, 500, errorMessage)
    }
    req.user = user
    return next()
  })(req, res, next)
}
