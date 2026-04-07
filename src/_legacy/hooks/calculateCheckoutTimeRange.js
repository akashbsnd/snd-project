export function calculateCheckoutTimeRange({ startTime, timeAlloted }) {
  // Parse the timeAlloted string to get hours and minutes
  const timeParts = timeAlloted.split(" ");
  let hoursToAdd = 0;
  let minutesToAdd = 0;

  if (timeParts.length === 4) {
    // Format: "1 hr 30 min"
    hoursToAdd = parseInt(timeParts[0]);
    minutesToAdd = parseInt(timeParts[2]);
  } else if (timeParts.length === 2) {
    // Format: "30 min"
    minutesToAdd = parseInt(timeParts[0]);
  }

  // Parse the start time
  const [timeStr, period] = startTime.split(" ");
  let [hours, minutes] = timeStr.split(":").map(Number);

  // Convert to 24-hour format for easier calculations
  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  // Add the time
  const startDate = new Date();
  startDate.setHours(hours, minutes, 0, 0);
  startDate.setMinutes(startDate.getMinutes() + minutesToAdd);
  startDate.setHours(startDate.getHours() + hoursToAdd);

  // Format the result
  let endHours = startDate.getHours();
  const endMinutes = startDate.getMinutes();
  const endPeriod = endHours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  endHours = endHours % 12;
  endHours = endHours ? endHours : 12; // Convert 0 to 12 for 12 AM

  // Format minutes with leading zero
  const formattedMinutes = endMinutes.toString().padStart(2, "0");

  return `${endHours}:${formattedMinutes} ${endPeriod}`;
}
