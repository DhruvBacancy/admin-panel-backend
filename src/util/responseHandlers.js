exports.successResponse = (req, res, data, code = 200) =>
  res.send({
    code,
    data,
    success: true,
  })

exports.errorResponse = (
  req,
  res,
  code = 500,
  errorMessage = "Something went wrong",
  error = {}
) =>
  res.status(code).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  })
