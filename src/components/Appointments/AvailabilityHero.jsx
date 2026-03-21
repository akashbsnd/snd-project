import { labels } from "../../static/labels";
import {
  getAbbrMonth,
  getTimeZone,
  getDay,
  getFullYear,
  getDate,
} from "../../hooks/dateFuncs";
import { formattedDate, weekNameList } from "../../static/dateObj";

export default function AvailabilityHero({ selectedDate, appointments }) {
  return (
    <>
      <div>
        <div className="text-core-text-20 text-sm w-full flex justify-center whitespace-pre-wrap">
          <span>
            {labels.appointments.timesShown}{" "}
            <span className="font-semibold">{getTimeZone(selectedDate)}</span>.
          </span>
        </div>
      </div>
      <h3 className="my-6">
        {
        appointments.length === 0 ? (
          <span>
            No appointments available for this date
          </span>
        ) : 
        selectedDate === formattedDate ? (
          <span>
            {labels.appointments.today}, {weekNameList[getDay(selectedDate)]},{" "}
            {getAbbrMonth(selectedDate)} {getDate(selectedDate)},{" "}
            {getFullYear(selectedDate)}
          </span>
        ) : (
          <span>
            {weekNameList[getDay(selectedDate)]}, {getAbbrMonth(selectedDate)}{" "}
            {getDate(selectedDate)}, {getFullYear(selectedDate)}
          </span>
        )
      }
      </h3>
    </>
  );
}
