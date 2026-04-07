import CalendarArrowButtons from "./CalendarArrowButtons";
import CalendarCarouselWeek from "./CalendarCarouselWeek";
import { useState } from "react";
import { generateCalendarDates } from "../../hooks/generateCalendarDates";
import { getFullYear, getAbbrMonth } from "../../hooks/dateFuncs";

export default function CalendarCarousel({
  selectedDate,
  setSelectedDate,
  toggleCalendarView,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const calendar = generateCalendarDates({ dateRange: 42 }).slice(
    currentPage,
    currentPage + 6,
  );

  // 9am start
  // 1pm end

  return (
    <div className="calendar relative ">
      <div
        data-testid="weekview-date-picker"
        className="flex flex-col mb-4"
        id="week-view"
      >
        <div className="flex mb-4 items-center">
          {toggleCalendarView ? (
            ""
          ) : (
            <h2 className="flex-grow">
              {getAbbrMonth(selectedDate)} {getFullYear(selectedDate)}
            </h2>
          )}

          <CalendarArrowButtons
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <div className="flex items-center">
          <div className="sm:px-2.5 w-0 flex flex-grow overflow-hidden">
            <div className="flex w-full my-2">
              <CalendarCarouselWeek
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                calendarWeek={calendar}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
