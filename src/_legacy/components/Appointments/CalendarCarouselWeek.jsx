import CalendarDate from "./CalendarDate";

export default function CalendarCarouselWeek({
  calendarWeek,
  selectedDate,
  setSelectedDate,
}) {
  return (
    <div
      aria-hidden="true"
      className="calendar-week flex justify-between sm:px-2.5 "
    >
      {calendarWeek.map((week) => {
        return (
          <CalendarDate
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            key={week.dateName}
            dateName={week.dateName}
            date={week.date}
            month={week.month}
            year={week.year}
          />
        );
      })}
    </div>
  );
}
