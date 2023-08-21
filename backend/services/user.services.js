const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const userService = {
  register: async (name, email, password) => {
    try {
      const existingUser = await User.findOne({
        email,
      });

      if (existingUser) {
        return {
          type: "error",
          msg: `El correo ${existingUser.email} no se encuentra disponible`,
          isSuccesful: false,
        };
      }

      const user = new User({
        name,
        email,
        password,
      });

      // Encriptar contraseña
      const salt = bcryptjs.genSaltSync();
      user.password = bcryptjs.hashSync(password, salt);

      // Guardar en DB
      await user.save();

      const response = {
        type: "success",
        message: "User created successfully",
        isSuccesful: true,
      };

      return response;
    } catch (error) {
      console.log(error);
      return {
        type: "error",
        message: "error",
        isSuccesful: false,
      };
    }
  },

  login: async (email, password) => {
    try {
      const include = {
        createdAt: 0,
        updatedAt: 0,
      };

      const currentUser = await User.findOne({ email }, include);

      if (!currentUser) {
        return {
          type: "error",
          msg: "Usuario ó Contraseña no son correctos",
          isSuccesful: false,
        };
      }

      // Verificar la contraseña
      const validPassword = bcryptjs.compareSync(
        password,
        currentUser.password,
      );

      if (!validPassword) {
        return {
          type: "error",
          msg: "Usuario ó Contraseña no son correctos",
          isSuccesful: false,
        };
      }

      // Generar el JWT
      const token = jwt.sign(
        {
          userid: currentUser.id,
        },
        process.env.JWT_SECRET_VALUE,
        {
          expiresIn: "12h",
        },
      );

      const response = {
        type: "success",
        currentUser,
        token,
        isSuccesful: true,
      };

      return response;
    } catch (error) {
      console.log(error);
      return {
        type: "error",
        message: "error",
        isSuccesful: false,
      };
    }
  },
};

module.exports = userService;
