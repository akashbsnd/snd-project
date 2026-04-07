import { labels } from "../../static/labels";

export default function AptBtnsContainer({ availCatSeparator, TimeButtons }) {
  return (
    <div
      className="flex flex-wrap gap-2"
      aria-label="Available time slots, Morning, select a time to proceed"
      role="list"
    >
      <div className="flex-none w-full text-sm font-medium" aria-hidden="true">
        {availCatSeparator}
      </div>

      {TimeButtons.length ? (
        TimeButtons
      ) : (
        <div className="text-core-text-20">
          {" "}
          {labels.appointments.noAvailContainer}
        </div>
      )}
    </div>
  );
}
