import express from "express";
import {
  PostBranchBody,
  BuildModel,
  BuildListQuery,
  QueueBuildInput,
  BuildList,
  BuildRequestResultModel
} from "@shri-ci/types";
import backendApi from "../../backendApi";
import githubApi from "../../githubApi";
import updater from "../../updater";
import cache from "../../cache";

const router = express.Router();

router.get<{}, BuildList, {}, BuildListQuery>("/", async (req, res, next) => {
  try {
    const { offset, limit } = req.query;
    const data = await backendApi.getAllBuilds(offset, limit);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

type BuildIdParams = {
  buildId: string;
};

router.get<BuildIdParams, BuildModel>("/:buildId", async (req, res, next) => {
  try {
    const { buildId } = req.params;
    const data = await backendApi.getBuildDetails(buildId);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get<BuildIdParams, string>("/:buildId/logs", async (req, res, next) => {
  try {
    const { buildId } = req.params;
    const key = `build_log_${buildId}`;
    let data = cache.get(key);
    if (!data) {
      data = await backendApi.getBuildLog(buildId);
      cache.set(key, data);
    }
    res.set("Content-Type", "text/plain").send(data);
  } catch (error) {
    next(error);
  }
});

type CommitHashParams = {
  commitHash: string;
};

router.post<CommitHashParams, BuildRequestResultModel, PostBranchBody>("/:commitHash", async (req, res, next) => {
  try {
    const { commitHash } = req.params;
    const { branchName } = req.body;
    const settings = updater.getSettings();
    const commitInfo = await githubApi.getCommitInfo(settings.repoName, commitHash);
    const requestBuild: QueueBuildInput = { ...commitInfo, branchName };
    const data = await backendApi.requestBuild(requestBuild);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
