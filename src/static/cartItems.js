const CART_COOKIE_NAME = 'cart_backup';

function setCookie(name, value, days = 1) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name) {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export function setCart(cartItems) {
  console.warn('setCart is deprecated. Use useCart hook from CartContext instead.');
  const cartJson = JSON.stringify(cartItems);
  sessionStorage.setItem('cart', cartJson);
  setCookie(CART_COOKIE_NAME, cartJson, 7);
}

export function getCart() {
  console.warn('getCart is deprecated. Use useCart hook from CartContext instead.');
  try {
    const sessionItems = sessionStorage.getItem('cart');
    if (sessionItems) {
      return JSON.parse(sessionItems);
    }
    const cookieItems = getCookie(CART_COOKIE_NAME);
    if (cookieItems) {
      return JSON.parse(cookieItems);
    }
    return [];
  } catch (error) {
    return [];
  }
}

export function clearCartStorage() {
  sessionStorage.removeItem('cart');
  deleteCookie(CART_COOKIE_NAME);
}