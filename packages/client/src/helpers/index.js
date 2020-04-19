export function formatDuration(duration) {
  const date = new Date(duration);
  const h = date.getUTCHours();
  const m = date.getUTCMinutes();
  const s = date.getSeconds();
  return h > 0 ? `${h} ч ${m} мин` : `${m} м ${s} сек`;
}

export function getCardView(status) {
  switch (status) {
    case "Waiting":
    case "InProgress":
      return "pending";
    case "Success":
      return "success";
    default:
      return "fail";
  }
}
