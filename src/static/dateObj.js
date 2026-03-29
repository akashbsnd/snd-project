import { formatDate } from "../hooks/dateFuncs";

export function getCurrentDateInfo() {
  const currDate = new Date();
  return {
    currDate,
    formattedDate: `${currDate.getFullYear()},${formatDate(
      currDate.getMonth() + 1,
    )},${formatDate(currDate.getDate())}`,
    hrs: currDate.getHours(),
    min: currDate.getMinutes(),
    sec: currDate.getSeconds(),
    month: currDate.getMonth() + 1,
    date: currDate.getDate(),
    year: currDate.getFullYear(),
    day: currDate.getDay(),
  };
}

const abbrToFullWeekNames = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

const abbrMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekNameList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const abbrWeekNameList = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export {
  abbrToFullWeekNames,
  months,
  weekNameList,
  abbrWeekNameList,
  abbrMonths,
};
