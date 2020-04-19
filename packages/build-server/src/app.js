const express = require("express");
const config = require("./config");
const builds = require("./builds");
const pool = require("./pool");
const logger = require("./logger");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/notify-agent", (req, res) => {
  try {
    const { port, agentId } = req.body;
    if (req.hostname && port) {
      const id = pool.registerAgent(req.hostname, port, agentId);
      res.status(200).send(id);
    } else {
      res.status(400).send();
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/notify-build-result", (req, res) => {
  try {
    const { id, agentId, duration, status, log } = req.body;
    if (pool.freeAgent(agentId)) {
      builds.sendBuildResult(id, duration, status, log);
    } else {
      logger.warn(`Результаты билда ${id} присланы неизвестным агентом и проигнорированы.`);
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.use((req, res) => {
  res.status(404).send();
});

app.listen(config.port, () => {
  builds.start(config.updateInterval);
  logger.info(`Server started on port ${config.port}!`);
});
