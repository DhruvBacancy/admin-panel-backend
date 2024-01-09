const { errorResponse } = require("../util/responseHandlers")

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      return next()
    } else {
      return errorResponse(req, res, 500, "Access is Forbidden")
    }
  } catch (error) {
    const errorMessage = error.message
    return errorResponse(req, res, 500, errorMessage)
  }
}
