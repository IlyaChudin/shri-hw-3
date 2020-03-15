const express = require("express");
const api = require("../../backendApi");
const repository = require("../../repository");

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
    const settings = {
      repoName,
      buildCommand,
      mainBranch,
      period
    };
    await repository.setSettings(settings);
    await api.saveSettings(settings);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
