const express = require("express");
const settingsRoutes = require("./settings");

const router = express.Router();

router.use("/settings", settingsRoutes);

module.exports = router;
