const { response, request } = require("express");
const userService = require("../services/user.services");

const userController = {
  register: async (req = request, res = response) => {
    try {
      const { name, email, password } = req.body;

      const result = await userService.register(name, email, password);

      if (result.isSuccesful) {
        return res.status(200).json(result);
      }
      return res.status(400).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },

  login: async (req = request, res = response) => {
    try {
      const { email, password } = req.body;

      const result = await userService.login(email, password);

      if (result.isSuccesful) {
        return res.status(200).json(result);
      }
      return res.status(400).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = userController;
