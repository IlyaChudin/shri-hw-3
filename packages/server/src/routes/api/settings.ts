import express from "express";
import { ConfigurationInput, ConfigurationModel } from "../../../../types";
import backendApi from "../../backendApi";
import updater from "../../updater";
import githubApi from "../../githubApi";

const router = express.Router();

router.get<{}, ConfigurationModel>("/", async (req, res, next) => {
  try {
    const data = await backendApi.getSettings();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post<{}, {}, ConfigurationInput>("/", async (req, res, next) => {
  try {
    const settings = req.body;
    await githubApi.getRepositoryInfo(settings.repoName);
    await backendApi.saveSettings(settings);
    updater.start();
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

export default router;
