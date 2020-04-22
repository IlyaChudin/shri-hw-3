const express = require("express");
const config = require("./config");
const agent = require("./agent");
const logger = require("../../shared/src/logger");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/status", (req, res) =>
  res.json({
    isBusy: agent.isBusy(),
    buildId: agent.buildId(),
    agentId: agent.agentId()
  })
);

app.post("/build", (req, res) => {
  try {
    if (agent.isBusy()) {
      res.status(500).send("Agent is busy");
    } else {
      const { id, repoName, buildCommand, commitHash } = req.body;
      agent.startBuild(id, repoName, buildCommand, commitHash);
      res.status(200).send();
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.use((req, res) => {
  res.status(404).send();
});

app.listen(config.port, async () => {
  agent.start(config.updateInterval || 60000);
  logger.info(`Server started on port ${config.port}!`);
});
