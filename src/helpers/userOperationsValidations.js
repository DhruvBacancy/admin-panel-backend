const Joi = require("joi")
const { errorResponse } = require("../util/responseHandlers")

const uuidv4Schema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).message("Invalid id").required(),
})

exports.validaetUUID = (req, res, next) => {
  const validationResult = uuidv4Schema.validate(req.params)

  if (validationResult.error) {
    const errorMessage = validationResult.error.details[0].message
    return errorResponse(req, res, 500, errorMessage)
  }

  next()
}

const updateUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().required(),
  role: Joi.string().required(),
})

exports.validateUpdateUser = (req, res, next) => {
  const validationResult = updateUserSchema.validate(req.body)

  if (validationResult.error) {
    const errorMessage = validationResult.error.details[0].message
    return errorResponse(req, res, 500, errorMessage)
  }

  next()
}
