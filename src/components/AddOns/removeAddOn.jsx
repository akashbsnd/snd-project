import { setCart } from "../../static/cartItems";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export function removeAddOn({ addOnItemName }) {
  const { cartItems, setCartItems } = useContext(CartContext) || { cartItems: [], setCartItems: () => {} };

  const updatedCartRemovePackage = cartItems.map((item) => {
    item.addOns = item.addOns.filter((addOn) => {
      if (addOn.optionName !== addOnItemName) {
        return addOn;
      }
    });
    return item;
  });

  setCartItems(updatedCartRemovePackage);
}
