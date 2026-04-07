export function isOptionChecked({ optionName, packageName }) {
  const cartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");
  if (cartItems) {
    const findSelectedOption = cartItems.find((item) => {
      if (
        item.packageOption.name === optionName &&
        item.packageName === packageName
      )
        return item;
    });

    if (findSelectedOption) {
      return true;
    }
  }
  return false;
}
