import { labels } from "../../static/labels";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function CartButtonsSection() {
  const { cartItems, setCartItems } = useContext(CartContext) || { cartItems: [], setCartItems: () => {} };
  if (cartItems.length) {
    return (
      <div className="market-button-group">
        <a href={labels.links.appointmentsLink}>
          <button className="nextButton button">
            {labels.bookings.nextButton}
          </button>
        </a>
      </div>
    );
  } else {
    return (
      <div className="market-button-group">
        <button className="nextButton nextButtonDisabled">
          {labels.bookings.nextButton}
        </button>
      </div>
    );
  }
}
