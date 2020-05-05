import webPush, { PushSubscription } from "web-push";
import { BuildModel, BuildStatus } from "@shri-ci/types";
import backendApi from "./backendApi";

type Notification = Pick<BuildModel, "id" | "buildNumber" | "status">;

const subscriptions = new Map<string, PushSubscription>();
const statuses = new Map<string, BuildStatus>();
const notifications = new Array<Notification>();

const sendNotification = async (subscription: PushSubscription, notification: Notification): Promise<void> => {
  try {
    await webPush.sendNotification(subscription, JSON.stringify(notification));
    console.log(`Notification sent to ${subscription.endpoint}.`);
  } catch (e) {
    console.log(`Sending Notification to ${subscription.endpoint} failed. Endpoint removed.`);
    subscriptions.delete(subscription.endpoint);
  }
};

export const sendNotifications = async (): Promise<void> => {
  const notification = notifications.shift();
  if (notification) {
    subscriptions.forEach(x => sendNotification(x, notification));
  }
};

const addNewNotification = (x: BuildModel): void => {
  const notification = { id: x.id, status: x.status, buildNumber: x.buildNumber };
  notifications.push(notification);
  console.log("New notification:", notification);
};

let firstUpdate = true;

export const updateBuilds = async (): Promise<void> => {
  try {
    const buildList = await backendApi.getAllBuilds(0, 100);
    if (buildList) {
      buildList.forEach(x => {
        const status = statuses.get(x.id);
        if (status) {
          if (status !== x.status) {
            addNewNotification(x);
            statuses.set(x.id, x.status);
            if (x.status !== BuildStatus.InProgress) {
              statuses.delete(x.id);
              console.log("Build:", x.id, "deleted from watch list. Status:", x.status);
            }
          }
        } else if (x.status === BuildStatus.Waiting || x.status === BuildStatus.InProgress) {
          if (x.status === BuildStatus.Waiting && !firstUpdate) {
            addNewNotification(x);
          }
          statuses.set(x.id, x.status);
          console.log("Build:", x.id, "added to watch list. Status:", x.status);
        }
      });
      firstUpdate = false;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const addSubscription = (subscription: PushSubscription): void => {
  if (!subscriptions.has(subscription.endpoint)) {
    console.log(`Subscription registered ${subscription.endpoint}`);
    subscriptions.set(subscription.endpoint, subscription);
  }
};
