const { response, request } = require("express");
const dailyEntryService = require("../services/dailyEntry.services");

const dailyEntryController = {
  checkMood: async (req = request, res = response) => {
    try {
      const { mood, entry } = req.body;
      const { id } = req.user;

      const result = await dailyEntryService.checkMood(mood, entry, id);

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
  dailyEntryList: async (req = request, res = response) => {
    try {
      const { id } = req.user;

      const result = await dailyEntryService.dailyEntryList(id);

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

module.exports = dailyEntryController;
