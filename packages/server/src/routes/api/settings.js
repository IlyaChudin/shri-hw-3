const express = require("express");
const backendApi = require("../../backendApi");
const updater = require("../../updater");
const githubApi = require("../../githubApi");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await backendApi.getSettings();
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
    await githubApi.getRepositoryInfo(repoName);
    await backendApi.saveSettings(settings);
    await updater.setSettings(settings);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
