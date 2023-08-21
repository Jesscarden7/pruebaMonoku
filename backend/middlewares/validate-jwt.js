const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      type: "error",
      msg: "No hay token en la petición",
    });
  }

  try {
    const { userid } = jwt.verify(token, process.env.JWT_SECRET_VALUE);

    const user = await User.findById(userid);

    if (!user) {
      return res.status(401).json({
        type: "error",
        msg: "Token no válido - usuario no existe",
      });
    }

    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      type: "error",
      msg: "Token no válido",
    });
  }
};

module.exports = validateJWT;
