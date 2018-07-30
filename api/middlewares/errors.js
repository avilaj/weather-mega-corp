const errors = (err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500; // Sets a generic server error status code if none is part of the err

  res.status(err.statusCode).send(err.message); // If shouldRedirect is not defined in our error, sends our original err data
};

module.exports = errors;