
const errorMiddleware = (err, req, res, next) => {
  console.error(err.message);

  // Invalid JSON request
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON format"
    });
  }

  // Mongoose validation or ID errors
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({
      message: err.message
    });
  }

  // Other server errors
  res.status(500).json({
    message: "Internal server error"
  });
};

module.exports = errorMiddleware;
