
const errorMiddleware = (err, req, res, next) => {
  console.error(err.message);

  // Mongoose validation error
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
