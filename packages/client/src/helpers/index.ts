import { BuildStatus } from "@shri-ci/types";

export const formatDuration = (duration: number): string => {
  const date = new Date(duration);
  const h = date.getUTCHours();
  const m = date.getUTCMinutes();
  const s = date.getSeconds();
  return h > 0 ? `${h} ч ${m} мин` : `${m} м ${s} сек`;
};

export const getCardView = (status: BuildStatus): string => {
  switch (status) {
    case BuildStatus.Waiting:
    case BuildStatus.InProgress:
      return "pending";
    case BuildStatus.Success:
      return "success";
    default:
      return "fail";
  }
};
