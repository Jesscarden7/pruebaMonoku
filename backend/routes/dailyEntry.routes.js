const express = require("express");
const router = express.Router();

const validateJWT = require("../middlewares/validate-jwt");

const dailyEntryController = require("../controllers/dailyEntry.controller");

router.post("/", validateJWT, dailyEntryController.checkMood);
router.get("/list", validateJWT, dailyEntryController.dailyEntryList);

module.exports = router;
