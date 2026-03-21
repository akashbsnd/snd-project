import { calculateItemsTotal } from "../../../hooks/calculateItemsTotal";
import { FaRegCalendar } from "react-icons/fa";
import { labels } from "../../../static/labels";
import { calculateCheckoutTimeRange } from "../../../hooks/calculateCheckoutTimeRange";
import { weekNameList, months } from "../../../static/dateObj";
import { getDay, getMonth, getDate } from "../../../hooks/dateFuncs";

export default function CheckoutCartHero() {
  const { cartItems, setCartItems } = useContext(CartContext) || { cartItems: [], setCartItems: () => {} };

  const date = cartItems[0]?.apptDate;

  return (
    <div className="w-full market-row preload flex items-center justify-between checkout-hero">
      <FaRegCalendar className="bg-gray-100 w-8 h-8 p-2 rounded mr-4" />
      {date && cartItems[0].apptTime && cartItems[0].packageTimeAlloted ? (
        <div className="pr-8">
          <label slot="subtext" className="date">
            {weekNameList[getDay(date)]}, {months[getMonth(date)]}{" "}
            {getDate(date)}
          </label>
          <label slot="subtext">
            <div>
              {cartItems[0].apptTime} -{" "}
              {calculateCheckoutTimeRange({
                startTime: cartItems[0].apptTime,
                timeAlloted: cartItems[0].packageTimeAlloted,
              })}
            </div>
            <div className="flex flex-col items-start">
              {labels.checkout.estDue}

              <span>${calculateItemsTotal()}</span>
            </div>
          </label>
        </div>
      ) : (
        "No appointment time and date was selected."
      )}
    </div>
  );
}
