import { labels } from "../../static/labels";

export function updateModifier({ addOnItems, packageName, navigate, cartItems, setCartItems }) {

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
