import { BuildStatus } from "@shri-ci/types";
import { TFunction } from "i18next";

export const formatDuration = (duration: number, t: TFunction): string => {
  const date = new Date(duration);
  const h = date.getUTCHours();
  const m = date.getUTCMinutes();
  const s = date.getSeconds();
  return h > 0 ? t("timeFormat.hm", { h, m }) : t("timeFormat.ms", { m, s });
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
