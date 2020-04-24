import express from "express";
import { Configuration } from "@shri-ci/types";
import backendApi from "../../backendApi";
import updater from "../../updater";
import githubApi from "../../githubApi";

const router = express.Router();

router.get<{}, Configuration>("/", async (req, res, next) => {
  try {
    const data = await backendApi.getSettings();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post<{}, {}, Configuration>("/", async (req, res, next) => {
  try {
    const settings = req.body;
    await githubApi.getRepositoryInfo(settings.repoName);
    await backendApi.saveSettings(settings);
    await updater.setSettings(settings);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

export default router;
