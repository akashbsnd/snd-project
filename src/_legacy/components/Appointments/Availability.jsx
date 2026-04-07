import { generateCalendarDates } from "../../hooks/generateCalendarDates";
import { generateDateRange } from "../../hooks/generateDateRange";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { labels } from "../../static/labels";
import { months, weekNameList } from "../../static/dateObj";
import TimeButtonCategories from "./TimeButtonCategories";
import {
  getFullYear,
  getMonth,
  getDate,
  formatDate,
} from "../../hooks/dateFuncs";
import { CartContext } from "../../context/CartContext";

function getJwtToken() {
  return localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
}

async function getTeamMembers() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API_URL}/searchTeamMembers`,
      {
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export default function Availabilty({
  setSelectedDate,
  selectedDate,
  appointments,
  setAppointments,
  isLoading,
  setIsLoading,
}) {
  const { cartItems } = useContext(CartContext);
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

  async function findNextAvailableDate(startFromDate) {
    if (!cartItems.length) return null;

    const calendarDates = generateCalendarDates({ dateRange: 60 });
    const startIndex = calendarDates.findIndex(
      (calDate) =>
        `${calDate.year},${formatDate(calDate.month)},${formatDate(calDate.date)}` ===
        startFromDate,
    );

    if (startIndex === -1) return null;

    const teamMembers = await getTeamMembers();
    const teamMemberIds = teamMembers.map(tm => tm.id);

    for (let i = startIndex + 1; i < calendarDates.length; i++) {
      const calDate = calendarDates[i];
      const dateString = `${calDate.year},${formatDate(calDate.month)},${formatDate(calDate.date)}`;

      try {
        const endDate = generateDateRange({
          startDate: dateString,
          endTime: 13,
        });

          if (endDate) {
            const [year, month, day] = dateString.split(",").map(Number);
            const newStartDate = new Date(Date.UTC(year, month - 1, day, 9, 0, 0));
            const newEndDate = endDate;

            const appts = await axios.post(
            `${import.meta.env.VITE_BACKEND_API_URL}/bookings`,
            {
              startAt: newStartDate,
              endAt: newEndDate,
              serviceVariationId: cartItems[0].packageOption.id,
              teamMemberIds: teamMemberIds,
            },
            {
              headers: {
                Authorization: `Bearer ${getJwtToken()}`,
              },
            }
          );

          if (appts.data.appts && appts.data.appts.length > 0) {
            const dateObj = {
              dateString,
              year: calDate.year,
              month: calDate.month,
              date: calDate.date,
              dateName: calDate.dateName,
            };
            
            if (isValidDate(dateObj)) {
              return dateObj;
            }
          }
        }
      } catch (err) {
        console.error(`Error checking date ${dateString}:`, err);
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
          const [year, month, day] = selectedDate.split(",").map(Number);
          const newStartDate = new Date(Date.UTC(year, month - 1, day, 9, 0, 0));
          const newEndDate = endDate;

          const teamMembers = await getTeamMembers();
          const teamMemberIds = teamMembers.map(tm => tm.id);

          const appts = await axios.post(
            `${import.meta.env.VITE_BACKEND_API_URL}/bookings`,
            {
              startAt: newStartDate,
              endAt: newEndDate,
              serviceVariationId: cartItems[0].packageOption.id,
              teamMemberIds: teamMemberIds,
            },
            {
              headers: {
                Authorization: `Bearer ${getJwtToken()}`,
              },
            }
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

            return { 
              hrs: hours, 
              min: min, 
              timeMeridiem: timeMeridiem,
              teamMemberId: appt.teamMemberId,
            };
          });
          setAppointments(apptTimes);

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
  }, [selectedDate, cartItems]);

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
