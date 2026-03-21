export function setCart(cartItems) {
  // This function is deprecated - use useCart hook instead
  console.warn('setCart is deprecated. Use useCart hook from CartContext instead.');
  sessionStorage.setItem("cart", JSON.stringify(cartItems));
}

export function getCart() {
  // This function is deprecated - use useCart hook instead
  console.warn('getCart is deprecated. Use useCart hook from CartContext instead.');
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}