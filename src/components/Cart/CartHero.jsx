import { calculateItemsTotal } from "../../hooks/calculateItemsTotal";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function CartHero() {
  const { cartItems, setCartItems } = useContext(CartContext) || { cartItems: [], setCartItems: () => {} };
  /*TODO: handle multiple cart items*/
  return (
    <div className="flex-grow flex-col overflow-wrap-anywhere">
      <div className="line-clamp-3 font-semibold">
        {cartItems[0].packageName}
      </div>
      <div className="text-sm text-core-text-20">
        ${calculateItemsTotal()} ・ {cartItems[0].packageTimeAlloted}
      </div>
    </div>
  );
}
