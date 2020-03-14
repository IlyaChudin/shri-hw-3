const express = require("express");
const { settings } = require("../../backendApi");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await settings.get();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { repoName, buildCommand, mainBranch, period } = req.body;
    await settings.save({
      repoName,
      buildCommand,
      mainBranch,
      period
    });
    res.status(200).send();
  } catch (error) {
    if (error.response.status === 400) {
      error.data = { errors: error.response.data.errors };
    }
    next(error);
  }
});

module.exports = router;
