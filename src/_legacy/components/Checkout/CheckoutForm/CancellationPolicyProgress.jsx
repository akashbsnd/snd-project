import { useState, useEffect, useRef } from "react";
import { weekNameList, months, abbrMonths } from "../../../static/dateObj";
import { getDay, getMonth, getDate } from "../../../hooks/dateFuncs";

export default function CancellationPolicyProgress() {
  const [progress, setProgress] = useState(0);
  const [hasAppointment, setHasAppointment] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const [formattedDateShort, setFormattedDateShort] = useState("");
  const startTimeRef = useRef(null);
  const appointmentDateRef = useRef(null);

  // Get cart items and parse appointment date and time
  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");

    if (
      cartItems.length > 0 &&
      cartItems[0].apptDate &&
      cartItems[0].apptTime
    ) {
      const apptDateStr = cartItems[0].apptDate; // Format: "2024,01,15"
      const apptTimeStr = cartItems[0].apptTime; // Format: "10:30 AM"

      // Parse date string (year,month,day)
      const [year, month, day] = apptDateStr.split(",").map(Number);

      // Parse time string (e.g., "10:30 AM")
      const [timePart, meridiem] = apptTimeStr.split(" ");
      const [hours, minutes] = timePart.split(":").map(Number);

      let hour24 = hours;
      if (meridiem === "PM" && hours !== 12) {
        hour24 = hours + 12;
      } else if (meridiem === "AM" && hours === 12) {
        hour24 = 0;
      }

      // Create appointment date object
      const appointmentDate = new Date(
        year,
        month - 1,
        day,
        hour24,
        minutes,
        0,
        0,
      );
      appointmentDateRef.current = appointmentDate;
      startTimeRef.current = new Date();

      // Format date for display: "Monday, January 15"
      const dateObj = new Date(year, month - 1, day);
      const weekDayName = weekNameList[getDay(dateObj)];
      const monthName = months[getMonth(dateObj)];
      const dayNumber = getDate(dateObj);
      const fullDateString = `${weekDayName}, ${monthName} ${dayNumber}`;

      // Format short date for button: "Jan 15" using abbreviated month
      const abbrMonthName = abbrMonths[getMonth(dateObj)];
      const shortDateString = `${abbrMonthName} ${dayNumber}`;

      setFormattedDate(fullDateString);
      setFormattedDateShort(shortDateString);
      setFormattedTime(apptTimeStr); // Keep original format like "10:30 AM"
      setHasAppointment(true);
    } else {
      setHasAppointment(false);
    }
  }, []);

  // Update progress in real-time
  useEffect(() => {
    if (!hasAppointment || !appointmentDateRef.current || !startTimeRef.current)
      return;

    const updateProgress = () => {
      const now = new Date();
      const startTime = startTimeRef.current;
      const endTime = appointmentDateRef.current;

      // If current time is past appointment time, set progress to 100%
      if (now >= endTime) {
        setProgress(100);
        return;
      }

      // If current time is before start time, set progress to 0%
      if (now <= startTime) {
        setProgress(0);
        return;
      }

      // Calculate progress percentage
      const totalDuration = endTime - startTime;
      const elapsed = now - startTime;
      const progressPercent = (elapsed / totalDuration) * 100;

      setProgress(Math.min(100, Math.max(0, progressPercent)));
    };

    // Update immediately
    updateProgress();

    // Update more frequently for smoother animation (every 100ms)
    const interval = setInterval(updateProgress, 100);

    return () => clearInterval(interval);
  }, [hasAppointment]);

  if (!hasAppointment) {
    return null;
  }

  // Clamp progress to ensure colored bar stays within bounds (0% to 100%)
  const progressPercent = Math.min(100, Math.max(0, progress));
  // Check if cancellation window has passed
  const cancellationWindowPassed = progressPercent >= 100;

  // Marker position matches progress, but clamped to ensure marker circle stays within bar
  // Marker is 16px (w-4), with translate(-50%) it extends 8px each side
  // Clamp to 2% and 98% to ensure marker stays fully visible within the bar
  const markerPosition =
    progressPercent <= 2 ? 2 : progressPercent >= 98 ? 98 : progressPercent;

  // Calculate tooltip position to ensure it's always visible on mobile and desktop
  // Use percentage-based positioning to keep tooltip within viewport
  const tooltipLeftPercent =
    markerPosition < 25 ? 0 : markerPosition > 75 ? 100 : markerPosition;

  return (
    <div className="my-4">
      <h3 className="mb-4">Cancellation policy</h3>
      {!cancellationWindowPassed && (
        <div className="w-full mb-4 pt-12 relative">
          <div className="relative h-6 w-full" style={{ overflow: "visible" }}>
            {/* Background progress bar track */}
            <div
              className="absolute h-full w-full rounded-full border border-solid border-black/5 bg-gray-100"
              style={{ overflow: "hidden" }}
            ></div>

            {/* Colored progress bar - clamped to stay within bounds, matches marker position */}
            <div
              className="absolute h-full rounded-full bg-core-emphasis-40"
              style={{
                width: `${markerPosition}%`,
                maxWidth: "100%",
                overflow: "hidden",
                borderRadius: "9999px",
                transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            ></div>

            {/* Round marker with X icon - positioned at the edge of progress, clamped to stay within bar */}
            <div
              className="absolute top-1/2 z-10"
              style={{
                left: `${markerPosition}%`,
                transform: "translate(-50%, -50%)",
                transition: "left 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="relative flex items-center justify-center">
                {/* Tooltip positioned dynamically to stay visible */}
                <market-pill
                  size="small"
                  variant="emphasis"
                  className="absolute market-pill whitespace-nowrap"
                  style={{
                    backgroundColor: "#002559",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.75rem",
                    lineHeight: "1.2",
                    top: "-2rem",
                    left:
                      tooltipLeftPercent === 0
                        ? "0px"
                        : tooltipLeftPercent === 100
                          ? "auto"
                          : "50%",
                    right: tooltipLeftPercent === 100 ? "0px" : "auto",
                    transform:
                      tooltipLeftPercent === 0
                        ? "translateX(0)"
                        : tooltipLeftPercent === 100
                          ? "translateX(0)"
                          : "translateX(-50%)",
                    transition:
                      "left 0.5s cubic-bezier(0.4, 0, 0.2, 1), right 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  hydrated=""
                >
                  <template shadowrootmode="open">
                    <slot name="icon"></slot>
                    <slot></slot>
                  </template>
                  Cancel by {formattedDateShort}
                </market-pill>
                <div className="w-4 h-4 bg-white rounded-full border-2 border-core-emphasis-40 flex items-center justify-center shadow-md relative z-10">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-bbf-darken-fill"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 8C0 3.58222 3.58222 0 8 0C12.4178 0 16 3.58222 16 8C16 12.4178 12.4178 16 8 16C3.58222 16 0 12.4178 0 8ZM1.77778 8C1.77778 11.4311 4.56889 14.2222 8 14.2222C11.4311 14.2222 14.2222 11.4311 14.2222 8C14.2222 4.56889 11.4311 1.77778 8 1.77778C4.56889 1.77778 1.77778 4.56889 1.77778 8ZM8.00004 6.7467L10.0356 4.70226L11.2978 5.96448L9.25337 8.00004L11.2978 10.0356L10.0356 11.2978L8.00004 9.26226L5.96448 11.2978L4.70226 10.0356L6.7467 8.00004L4.70226 5.96448L5.96448 4.70226L8.00004 6.7467Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <small className="text-core-text-10 text-xs">Today</small>
            <small className="text-core-text-10 text-xs">Appointment</small>
          </div>
        </div>
      )}
      <div>
        {cancellationWindowPassed ? (
          <>
            This appointment can't be canceled or rescheduled after booking as
            the cancellation window has passed.&nbsp;
            <market-link className="market-link" hydrated="">
              <template shadowrootmode="open">
                <button>
                  <slot></slot>
                </button>
              </template>
              <span className="underline decoration-bbf-text-decoration-color">
                See full policy
              </span>
            </market-link>
          </>
        ) : (
          <>
            Please cancel or reschedule before {formattedTime} on{" "}
            {formattedDate}.&nbsp;
            <market-link className="market-link" hydrated="">
              <template shadowrootmode="open">
                <button>
                  <slot></slot>
                </button>
              </template>
              <span className="underline decoration-bbf-text-decoration-color">
                See full policy
              </span>
            </market-link>
          </>
        )}
      </div>
    </div>
  );
}
