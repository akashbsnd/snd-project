import { hrs, min, sec, month, date, year } from "../static/dateObj";
import { getMonth, getDate, getFullYear, formatDate } from "./dateFuncs";

export function generateDateRange({ startDate, endTime }) {
  let currHrs = hrs;
  let currMin = min;
  const currSecs = sec;

  const currMonth = month;
  const currDate = date;
  const currYear = year;

  if (
    (startDate === `${currYear},${currMonth},${currDate}` &&
      currHrs < endTime) ||
    startDate !== `${currYear},${currMonth},${currDate}`
  ) {
    const newYear = getFullYear(startDate);
    const newMonth = getMonth(startDate, false);
    const newDate = getDate(startDate);

    currHrs = endTime;

    const endDate = new Date(newYear, newMonth - 1, newDate, currHrs, currMin, currSecs);
    return endDate.toISOString();
  }

  return "";
}
