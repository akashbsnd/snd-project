import { labels } from "../static/labels";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function removePackage({ packageName, navigate }) {
  const { cartItems, setCartItems } = useContext(CartContext) || { cartItems: [], setCartItems: () => {} };

  const updatedCartRemovePackage = cartItems.filter((item) => {
    if (item.packageName !== packageName) {
      return item;
    }
  });

  setCartItems(updatedCartRemovePackage);

  return navigate(labels.links.bookingsLink);
}
