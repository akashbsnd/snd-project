import { labels } from "../../static/labels";
import {
  getAbbrMonth,
  getTimeZone,
  getDay,
  getFullYear,
  getDate,
  formatDate,
} from "../../hooks/dateFuncs";
import { weekNameList } from "../../static/dateObj";

function getFormattedDate() {
  const now = new Date();
  return `${now.getFullYear()},${formatDate(now.getMonth() + 1)},${formatDate(now.getDate())}`;
}

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
        selectedDate === getFormattedDate() ? (
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
