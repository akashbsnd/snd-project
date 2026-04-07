import Button from "../Button";
import { abbrToFullWeekNames } from "../../static/dateObj";
import { formatDate } from "../../hooks/dateFuncs";

export default function CalendarDate({
  dateName,
  date,
  selectedDate,
  setSelectedDate,
  month,
  year,
}) {
  return (
    <>
      {selectedDate === `${year},${formatDate(month)},${formatDate(date)}` ? (
        <Button
          onClick={() => setSelectedDate(`${year},${formatDate(month)},${formatDate(date)}`)}
          aria-pressed="true"
          data-testid={`date-${date}-selected`}
          rank="secondary"
          size="small"
          className="selected h-16 flex bg-black market-button calendar-date"
          type="button"
          variant="regular"
          hydrated=""
          label={
            <div className="flex flex-col items-center">
              <div
                className="text-white font-semibold"
                aria-label={abbrToFullWeekNames[dateName]}
              >
                {dateName}
              </div>
              <div className="text-center font-normal text-white">{date}</div>
            </div>
          }
        />
      ) : (
        <Button
          onClick={() =>
            setSelectedDate(`${year},${formatDate(month)},${formatDate(date)}`)
          }
          aria-pressed="false"
          data-testid={`date-${date}`}
          disabled=""
          rank="secondary"
          size="small"
          className="h-16 flex bg-transparent market-button calendar-date"
          type="button"
          variant="regular"
          hydrated=""
          label={
            <div className="flex flex-col items-center">
              <div
                className="text-core-text-20 font-normal"
                aria-label={abbrToFullWeekNames[dateName]}
              >
                {dateName}
              </div>
              <div className="text-center font-normal">{date}</div>
            </div>
          }
        />
      )}
    </>
  );
}
