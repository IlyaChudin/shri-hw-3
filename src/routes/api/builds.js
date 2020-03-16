const express = require("express");
const api = require("../../backendApi");
const repository = require("../../repository");
const cache = require("../../cache");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { offset, limit } = req.query;
    const data = await api.getAllBuilds(offset, limit);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:buildId", async (req, res, next) => {
  try {
    const { buildId } = req.params;
    const data = await api.getBuildDetails(buildId);
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
      data = await api.getBuildLog(buildId);
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
    const commitInfo = await repository.getCommitInfo(commitHash);
    await api.requestBuild(commitInfo);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
