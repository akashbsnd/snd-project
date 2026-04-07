import { labels } from "../static/labels";

export function removePackage({ packageName, navigate, cartItems, setCartItems }) {
  const updatedCartRemovePackage = cartItems.filter((item) => {
    if (item.packageName !== packageName) {
      return item;
    }
  });

  setCartItems(updatedCartRemovePackage);

  return navigate(labels.links.bookingsLink);
}
