import { Calendar } from "../ui/calendar";
import { addMonths, startOfMonth, startOfDay, isSameDay } from "date-fns";
import { Button } from "../ui/button";
import { labels } from "../../static/labels";
import {
  createNewDate,
  formatDate,
  getFullYear,
  getMonth,
  getDate,
} from "../../hooks/dateFuncs";

export default function HiddenCalendar({
  selectedDate,
  setSelectedDate,
  nextAvailableDate,
  setAppointments,
}) {
  const currDate = new Date();
  const formatDateDisplay = (dateString) => {
    if (!dateString) return "";
    const date = createNewDate(dateString);
    const year = getFullYear(date);
    const month = formatDate(getMonth(date, false)); // getMonth with isIndex=false to get 1-12
    const day = formatDate(getDate(date));
    return `${month}/${day}/${year}`;
  };

  const formatSelectYear = getFullYear(selectedDate);
  const formatSelectMonth = formatDate(getMonth(selectedDate, false));
  const formatSelectDate = formatDate(getDate(selectedDate));

  const isNextAvailableDate = isSameDay(
    selectedDate,
    createNewDate(nextAvailableDate),
  );

  const handleDateSelect = (date) => {
    setSelectedDate(date);

    if (nextAvailableDate && !isNextAvailableDate) {
      setSelectedDate(createNewDate(nextAvailableDate.dateString));
    }
  };

  // Format the current date for comparison
  const formattedCurrentDate = `${formatSelectYear}-${formatSelectMonth}-${formatSelectDate}`;

  return (
    <div className="calendar relative">
      <div
        data-testid="weekview-date-picker"
        className="flex flex-col mb-4"
        id="week-view"
      >
        <div className="flex items-center">
          <div className="sm:px-2.5 w-0 flex flex-grow overflow-hidden">
            <div className="flex flex-col w-full my-2 gap-4">
              <Calendar
                mode="single"
                startMonth={startOfMonth(currDate)}
                endMonth={startOfMonth(addMonths(currDate, 2))}
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-lg border w-full"
                disabled={{
                  before: startOfDay(createNewDate(formattedCurrentDate)),
                }}
              />

              {nextAvailableDate && !isNextAvailableDate && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    {labels.appointments.noAppointments}
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedDate(
                        createNewDate(nextAvailableDate.dateString),
                      );
                      // Trigger a refetch of appointments if needed
                      if (setAppointments) {
                        setAppointments([]); // This will trigger a refetch in the parent
                      }
                    }}
                    className="w-full"
                    variant="outline"
                  >
                    {labels.appointments.nextAvail}{" "}
                    {formatDateDisplay(nextAvailableDate.dateString)}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
