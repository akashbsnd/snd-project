export function formatTimeOptionRadios({ optionTimeAlloted }) {
  const timeInHours = optionTimeAlloted / 1000 / 3600;

  const isDecimal = Number.isInteger(optionTimeAlloted / timeInHours);
  if (!isDecimal) {
    const hrs = timeInHours.toString().split(".")[0];
    return `${hrs} hrs`;
  } else {
    const hrs = timeInHours.toString().split(".")[0];
    const min = timeInHours.toString().split(".")[1];
    return `${hrs} hrs ${min * 6} min`;
  }
}
