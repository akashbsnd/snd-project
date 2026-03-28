import { labels } from "../../static/labels";
import AptBtnsContainer from "./AptBtnsContainer";
import TimeButton from "./TimeButton";
import Button from "../Button";
import { formatDate } from "../../hooks/dateFuncs";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function TimeButtonCategories({
  appointments,
  selectedDate,
  setSelectedDate,
  nextAvailableDate,
}) {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);

  function addBookingToCart({ time }) {
    const updatedCartItems = [...cartItems];
    updatedCartItems[0]["apptTime"] = time;
    updatedCartItems[0]["apptDate"] = selectedDate;
    setCartItems(updatedCartItems);
    navigate(labels.links.checkoutLink);
  }

  const filterApts = {
    morning: {
      apts: [],
    },
    afternoon: {
      apts: [],
    },
    evening: {
      apts: [],
    },
  };

  appointments.forEach((appt) => {
    if (appt.hrs < 12 && appt.timeMeridiem === "AM") {
      filterApts.morning.apts.push(appt);
    } else if (appt.hrs < 6 && appt.timeMeridiem === "PM") {
      filterApts.afternoon.apts.push(appt);
    } else if (appt.timeMeridiem === "PM" && appt.hrs > 5 && appt.hrs < 12) {
      filterApts.evening.apts.push(appt);
    }
  });

  return (
    <div className="flex flex-col gap-4 mb-4">
      {appointments.length ? (
        <>
          <AptBtnsContainer
            availCatSeparator={labels.appointments.availMorning}
            TimeButtons={filterApts.morning.apts.map((appt, i) => {
              return (
                <TimeButton
                  addBookingToCart={addBookingToCart}
                  key={i}
                  time={`${appt.hrs}:${formatDate(appt.min)} ${
                    appt.timeMeridiem
                  }`}
                />
              );
            })}
          />

          <AptBtnsContainer
            availCatSeparator={labels.appointments.availAfternoon}
            TimeButtons={filterApts.afternoon.apts.map((appt, i) => {
              return (
                <TimeButton
                  addBookingToCart={addBookingToCart}
                  key={i}
                  time={`${appt.hrs}:${formatDate(appt.min)} ${
                    appt.timeMeridiem
                  }`}
                />
              );
            })}
          />

          <AptBtnsContainer
            availCatSeparator={labels.appointments.availEvening}
            TimeButtons={filterApts.evening.apts.map((appt, i) => {
              return (
                <TimeButton
                  addBookingToCart={addBookingToCart}
                  key={i}
                  time={`${appt.hrs}:${formatDate(appt.min)} ${
                    appt.timeMeridiem
                  }`}
                />
              );
            })}
          />
        </>
      ) : (
        <Button
          onClick={() => {
            if (nextAvailableDate) {
              setSelectedDate(nextAvailableDate.dateString);
            }
          }}
          rank="primary"
          size="small"
          className={`w-full market-button button ${!appointments.length && !nextAvailableDate ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="button"
          variant="regular"
          hydrated=""
          label={!appointments.length && !nextAvailableDate ? labels.appointments.noAvailabilityFound : labels.appointments.nextAvail}
          disabled={!appointments.length && !nextAvailableDate}
        />
      )}
    </div>
  );
}
