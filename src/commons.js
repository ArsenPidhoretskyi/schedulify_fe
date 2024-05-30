import moment from "moment";

export default function parseDatetime(datetimeStr, humanReadable = true) {
  const parsedDate = new Date(datetimeStr);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Kiev",
    hour12: false,
  };

  return humanReadable
    ? new Intl.DateTimeFormat("uk-UA", options).format(parsedDate)
    : moment(parsedDate).format("YYYY-MM-DDTkk:mm");
}

export function parseDate(datetimeStr) {
  const parsedDate = new Date(datetimeStr);

  return moment(parsedDate).format("YYYY-MM-DD");
}

export const serializeQuery = function (obj) {
  let str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
