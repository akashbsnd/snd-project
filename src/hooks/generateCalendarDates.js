import { abbrWeekNameList } from "../static/dateObj";
import { formatDate, getDay } from "./dateFuncs";

export function generateCalendarDates({ dateRange }) {
  const now = new Date();
  const currHrs = formatDate(now.getHours());
  const currMin = formatDate(now.getMinutes());
  const currSecs = formatDate(now.getSeconds());

  let newDate = now.getDate();
  let newMonth = now.getMonth() + 1;
  let newYear = now.getFullYear();

  const calendar = [];

  for (let i = 0; i < dateRange; i++) {
    switch (newMonth) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
        if (newDate > 31) {
          newDate -= 31;
          newMonth += 1;
        }
        break;
      case 12:
        if (newDate > 31) {
          newDate -= 31;
          newMonth = 1;
          newYear += 1;
        }
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        if (newDate > 30) {
          newDate -= 30;
        }
        break;
      case 2:
        if (newDate > 28) {
          newDate -= 28;
        }
        break;
    }

    const newEndDate = new Date(Date.UTC(newYear, newMonth - 1, newDate, 13, 0, 0));

    calendar.push({
      month: newMonth,
      year: newYear,
      date: newDate,
      dateName: abbrWeekNameList[newEndDate.getDay()],
    });

    newDate += 1;
  }

  return calendar;
}
