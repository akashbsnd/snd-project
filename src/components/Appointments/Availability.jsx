import { generateCalendarDates } from "../../hooks/generateCalendarDates";
import { generateDateRange } from "../../hooks/generateDateRange";
import axios from "axios";
import { useEffect, useState } from "react";
import { labels } from "../../static/labels";
import { months, weekNameList } from "../../static/dateObj";
import TimeButtonCategories from "./TimeButtonCategories";
import {
  getFullYear,
  getMonth,
  getDate,
  formatDate,
} from "../../hooks/dateFuncs";

export default function Availabilty({
  setSelectedDate,
  selectedDate,
  appointments,
  setAppointments,
  isLoading,
  setIsLoading,
}) {
  const { cartItems, setCartItems } = useContext(CartContext) || { cartItems: [], setCartItems: () => {} };
  const [nextAvailableDate, setNextAvailableDate] = useState(null);

  // Function to validate nextAvailableDate data
  function isValidDate(dateObj) {
    return (
      dateObj &&
      typeof dateObj === 'object' &&
      !isNaN(dateObj.year) &&
      !isNaN(dateObj.month) &&
      !isNaN(dateObj.date) &&
      dateObj.year > 0 &&
      dateObj.month > 0 &&
      dateObj.month <= 12 &&
      dateObj.date > 0 &&
      dateObj.date <= 31
    );
  }

  // Function to find the next available date with appointments
  async function findNextAvailableDate(startFromDate) {
    if (!cartItems.length) return null;

    const calendarDates = generateCalendarDates({ dateRange: 60 }); // Check up to 60 days ahead
    const startIndex = calendarDates.findIndex(
      (calDate) =>
        `${calDate.year},${formatDate(calDate.month)},${formatDate(calDate.date)}` ===
        startFromDate,
    );

    if (startIndex === -1) return null;

    // Check dates starting from the day after the selected date
    for (let i = startIndex + 1; i < calendarDates.length; i++) {
      const calDate = calendarDates[i];
      const dateString = `${calDate.year},${formatDate(calDate.month)},${formatDate(calDate.date)}`;

      try {
        const endDate = generateDateRange({
          startDate: dateString,
          endTime: 13,
        });

        if (endDate) {
          // Create Date object from the date string format (year,month,day)
          const [year, month, day] = dateString.split(",").map(Number);
          const newStartDate = new Date(year, month - 1, day);
          const newEndDate = new Date(endDate);

          const appts = await axios.post(
            `${import.meta.env.VITE_BACKEND_API_URL}/bookings`,
            {
              startAt: newStartDate,
              endAt: newEndDate,
              serviceVariationId: cartItems[0].packageOption.id,
            },
          );

          if (appts.data.appts && appts.data.appts.length > 0) {
            const dateObj = {
              dateString,
              year: calDate.year,
              month: calDate.month,
              date: calDate.date,
              dateName: calDate.dateName,
            };
            
            // Validate the date object before returning
            if (isValidDate(dateObj)) {
              return dateObj;
            }
          }
        }
      } catch (err) {
        console.error(`Error checking date ${dateString}:`, err);
        // Continue to next date if there's an error
      }
    }

    return null;
  }

  useEffect(() => {
    async function getAppointments() {
      try {
        setIsLoading(true);
        const endDate = generateDateRange({
          startDate: selectedDate,
          endTime: 13,
        });

        if (endDate && cartItems.length) {
          // Parse selectedDate format (year,month,day) to create Date object
          const [year, month, day] = selectedDate.split(",").map(Number);
          const newStartDate = new Date(year, month - 1, day);
          const newEndDate = new Date(endDate);

          const appts = await axios.post(
            `${import.meta.env.VITE_BACKEND_API_URL}/bookings`,
            {
              startAt: newStartDate,
              endAt: newEndDate,
              serviceVariationId: cartItems[0].packageOption.id,
            },
          );

          const apptTimes = appts.data.appts.map((appt) => {
            let hours = new Date(appt.startAt).getHours();
            const min = new Date(appt.startAt).getMinutes();
            let timeMeridiem = "AM";
            if (hours > 12) {
              hours -= 12;
              timeMeridiem = "PM";
            } else if (hours === 12) {
              timeMeridiem = "PM";
            }

            return { hrs: hours, min: min, timeMeridiem: timeMeridiem };
          });
          setAppointments(apptTimes);

          // If no appointments, find the next available date
          if (apptTimes.length === 0) {
            const nextAvail = await findNextAvailableDate(selectedDate);
            setNextAvailableDate(nextAvail);
          } else {
            setNextAvailableDate(null);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getAppointments();
  }, [selectedDate]);

  return (
    <div
      className="flex flex-1 flex-col"
      data-testid="availability-segments"
      id="availability-segments"
    >
      <div className="mb-4">
        {isLoading ? (
          <div className="mb-4">
            {labels.appointments.loading}
          </div>
        ) : !appointments.length && isValidDate(nextAvailableDate) ? (
          <div className="mb-4">
            {labels.appointments.nextAvailableOn}{" "}
            {weekNameList[
              new Date(
                nextAvailableDate.year,
                nextAvailableDate.month - 1,
                nextAvailableDate.date,
              ).getDay()
            ]
            }
            , {months[nextAvailableDate.month - 1]} {nextAvailableDate.date}.
          </div>
        ) : !appointments.length ? (
          <div className="mb-4">
            {labels.appointments.noAvailabilityFound}
          </div>
        ) : (
          <div className="mb-4">
            {labels.appointments.selectTimeBelow}
          </div>
        )}
        <TimeButtonCategories
          appointments={appointments}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          nextAvailableDate={nextAvailableDate}
        />
      </div>
      <div className="mb-4"></div>
    </div>
  );
}
