import { getMonth, getDate, getFullYear, formatDate } from "./dateFuncs";

export function generateDateRange({ startDate, endTime }) {
  const now = new Date();
  let currHrs = now.getHours();
  let currMin = now.getMinutes();
  const currSecs = now.getSeconds();

  const currMonth = now.getMonth() + 1;
  const currDateNum = now.getDate();
  const currYear = now.getFullYear();

  const formattedCurrentDate = `${currYear},${formatDate(currMonth)},${formatDate(currDateNum)}`;

  if (
    (startDate === formattedCurrentDate &&
      currHrs < endTime) ||
    startDate !== formattedCurrentDate
  ) {
    const newYear = getFullYear(startDate);
    const newMonth = getMonth(startDate, false);
    const newDate = getDate(startDate);

    currHrs = endTime;

    const endDate = new Date(Date.UTC(newYear, newMonth - 1, newDate, currHrs, currMin, currSecs));
    return endDate.toISOString();
  }

  return "";
}
