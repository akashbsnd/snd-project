import { abbrMonths } from "../static/dateObj";

export function parseCustomDate(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }
  const parts = dateString.split(",").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return null;
  }
  const [year, month, day] = parts;
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

export function getAbbrMonth(selectedDate) {
  return abbrMonths[getMonth(selectedDate)];
}

export function getMonth(selectedDate, isIndex = true) {
  if (isIndex) {
    return parseCustomDate(selectedDate)?.getMonth() ?? 0;
  } else {
    return (parseCustomDate(selectedDate)?.getMonth() ?? 0) + 1;
  }
}

export function getFullYear(selectedDate) {
  return parseCustomDate(selectedDate)?.getFullYear() ?? new Date().getFullYear();
}

export function getDate(selectedDate) {
  return parseCustomDate(selectedDate)?.getDate() ?? 1;
}

export function formatDate(date) {
  return date.toString().padStart(2, 0);
}

export function toDateISOString(date) {
  return new Date(date + "Z").toISOString();
}

export function getHours(date) {
  return new Date(date).getHours();
}

export function getMinutes(date) {
  return new Date(date).getMinutes();
}

export function getTimeZone(date) {
  const parsedDate = parseCustomDate(date) || new Date();
  return parsedDate.toLocaleString("en-US", {
    timeZoneName: "short",
  }).split(" ").at(-1);
}

export function getDay(date) {
  return parseCustomDate(date)?.getDay() ?? 0;
}

export function createNewDate(date) {
  if (typeof date === 'string' && date.includes(',')) {
    return parseCustomDate(date);
  }
  return new Date(date);
}
