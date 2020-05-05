import express from "express";
import cors from "cors";
import webPush, { PushSubscription } from "web-push";
import { addSubscription, sendNotifications, updateBuilds } from "./notifier";

import config from "./config";

const { publicKey, privateKey } = webPush.generateVAPIDKeys();
webPush.setVapidDetails("https://hw.shri.yandex/", publicKey, privateKey);

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post<{}, {}, PushSubscription>("/register", (req, res) => {
  addSubscription(req.body);
  res.sendStatus(201);
});

app.get<{}, string>(`/vapidPublicKey`, (req, res) => {
  res.send(publicKey);
});

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}!`);
  setInterval(() => updateBuilds(), 10 * 1000);
  setInterval(() => sendNotifications(), 1000);
});
