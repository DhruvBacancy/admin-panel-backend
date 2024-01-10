const Joi = require("joi")
const { errorResponse } = require("../util/responseHandlers")

const registrationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{5,}$/)
    .messages({
      "string.pattern.base":
        "Password must contain at least one digit, one capital letter, and one special character.",
      "string.min": "Password must be at least 5 characters long.",
    })
    .required(),
  role: Joi.string().required(),
})

exports.validateRegistration = (req, res, next) => {
  const validationResult = registrationSchema.validate(req.body)

  if (validationResult.error) {
    const errorMessage = validationResult.error.details[0].message
    return errorResponse(req, res, 500, errorMessage)
  }

  next()
}

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{5,}$/)
    .messages({
      "string.pattern.base": "Invalid Password",
      "string.min": "Invalid Password",
    })
    .required(),
})

exports.validateLogin = (req, res, next) => {
  const validationResult = loginSchema.validate(req.body)

  if (validationResult.error) {
    const errorMessage = validationResult.error.details[0].message
    return errorResponse(req, res, 500, errorMessage)
  }

  next()
}
