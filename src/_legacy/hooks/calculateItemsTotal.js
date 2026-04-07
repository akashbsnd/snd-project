export function calculateItemsTotal() {
  const cartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");
  let sumPrice = 0;
  cartItems.forEach((item) => {
    sumPrice += Number(item.packageOption.price);
    if (item.addOns && item.addOns.length) {
      item.addOns.forEach((modifier) => {
        sumPrice += Number(modifier.optionPrice);
      });
    }
  });
  return sumPrice.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
