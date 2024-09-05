const ApiError = require("../errors/ApiError");
const { verifyJWT } = require("../helper/jwt");

const checkJWT = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    throw ApiError.unAuthorized("A token is required for authentication");
  }

  try {
    const decoded = verifyJWT(token);
    req.user = decoded;

    next();
  } catch (err) {
    next(ApiError.unAuthorized("Invalid Token"));
  }
};

module.exports = {
  checkJWT,
};
