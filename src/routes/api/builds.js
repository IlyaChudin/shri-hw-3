const express = require("express");
const backendApi = require("../../backendApi");
const githubApi = require("../../githubApi");
const updater = require("../../updater");
const cache = require("../../cache");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { offset, limit } = req.query;
    const data = await backendApi.getAllBuilds(offset, limit);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:buildId", async (req, res, next) => {
  try {
    const { buildId } = req.params;
    const data = await backendApi.getBuildDetails(buildId);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:buildId/logs", async (req, res, next) => {
  try {
    const { buildId } = req.params;
    const key = `build_log_${buildId}`;
    let data = cache.get(key);
    if (data === undefined) {
      data = await backendApi.getBuildLog(buildId);
      cache.set(key, data);
    }
    res.set("Content-Type", "text/plain").send(data);
  } catch (error) {
    next(error);
  }
});

router.post("/:commitHash", async (req, res, next) => {
  try {
    const { commitHash } = req.params;
    // В README написал почему branchName получаю из тела запроса
    const { branchName } = req.body;
    const settings = updater.getSettings();
    const commitInfo = await githubApi.getCommitInfo(settings.repoName, commitHash);
    commitInfo.branchName = branchName || settings.mainBranch;
    await backendApi.requestBuild(commitInfo);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
