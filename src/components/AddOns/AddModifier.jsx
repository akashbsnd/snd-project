import { labels } from "../../static/labels";
import { getCart, setCart } from "../../static/cartItems";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export function updateModifier({ addOnItems, packageName, navigate }) {
  const { cartItems, setCartItems } = useContext(CartContext) || { cartItems: getCart(), setCartItems: setCart };

  if (addOnItems.length) {
    const updatedCartModifier = cartItems.map((item) => {
      if (item.packageName === packageName) {
        item.addOns = addOnItems;
        return item;
      } else {
        return item;
      }
    });
    setCartItems(updatedCartModifier);
  }

  return navigate(labels.links.appointmentsLink);
}
