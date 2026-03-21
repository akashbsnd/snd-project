import Cart from "../../components/Cart/Cart";
import "./Appointment.css";
import CalendarCarasoul from "../../components/Appointments/CalendarCarousel";
import CalendarToggleButton from "../../components/Appointments/CalendarToggleButton";
import Availabilty from "../../components/Appointments/Availability";
import AvailabilityHero from "../../components/Appointments/AvailabilityHero";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import HiddenCalendar from "../../components/Appointments/HiddenCalendar";
import { formattedDate } from "../../static/dateObj";
import { generateDateRange } from "../../hooks/generateDateRange";
import axios from "axios";
import { generateCalendarDates } from "../../hooks/generateCalendarDates";
import {

  formatDate,
} from "../../hooks/dateFuncs";

export default function Appointments() {
  const [toggleCalendarView, setToggleCalendarView] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextAvailableDate, setNextAvailableDate] = useState(null);

  const cartItems = sessionStorage.getItem("cart")
    ? JSON.parse(sessionStorage.getItem("cart"))
    : [];

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
    <div className="bg-white" id="root">
      <div className="mb-0 flex w-screen max-h-screen-svh min-h-screen-svh h-full overflow-hidden relative">
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="p-4">
            <h1>Book an Appointment</h1>
          </div>
          <div className="flex justify-center flex-grow w-full max-w-lg mx-auto">
            <div
              className="flex w-full justify-center"
              data-testid="availability-page"
            >
              <section
                aria-label="Main content"
                className="transition-opacity delay-150 duration-500 ease-in-out opacity-100 flex flex-col w-full px-4 md-lg:max-w-main-content "
              >
                {toggleCalendarView ? (
                  <HiddenCalendar
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                ) : (
                  <CalendarCarasoul
                    toggleCalendarView={toggleCalendarView}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                )}

                <CalendarToggleButton
                  toggleCalendarView={toggleCalendarView}
                  setToggleCalendarView={setToggleCalendarView}
                />

                <AvailabilityHero selectedDate={selectedDate} appointments={appointments} />

                <Availabilty
                  setSelectedDate={setSelectedDate}
                  selectedDate={selectedDate}
                  appointments={appointments}
                  setAppointments={setAppointments}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </section>
              <aside className="transition-opacity delay-150 duration-500 ease-in-out opacity-100 hidden md-lg:block md-lg:px-4 max-w-cart-sidebar min-w-cart-sidebar ">
                <div className="sticky top-2">
                  {/* Service Cart */}
                  <Cart />
                </div>
              </aside>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
