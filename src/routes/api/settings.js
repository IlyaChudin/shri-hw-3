const express = require("express");
const api = require("../../backendApi");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await api.getSettings();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { repoName, buildCommand, mainBranch, period } = req.body;
    await api.saveSettings({
      repoName,
      buildCommand,
      mainBranch,
      period
    });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
