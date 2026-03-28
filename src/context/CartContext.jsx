import { createContext, useEffect, useState } from 'react';
import { useDeviceType } from '../hooks/useDeviceType';

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

export const CartProvider = ({ children }) => {
  const { isMobile } = useDeviceType();

  const [cartItems, setCartItems] = useState(() => {
    if (isMobile) {
      return [];
    }
    try {
      const sessionItems = sessionStorage.getItem('cart');
      if (sessionItems) {
        return JSON.parse(sessionItems);
      }
      const cookieItems = getCookie(CART_COOKIE_NAME);
      if (cookieItems) {
        const parsed = JSON.parse(cookieItems);
        sessionStorage.setItem('cart', JSON.stringify(parsed));
        return parsed;
      }
      return [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    if (!isMobile) {
      const cartJson = JSON.stringify(cartItems);
      sessionStorage.setItem('cart', cartJson);
      setCookie(CART_COOKIE_NAME, cartJson, 7);
    }
  }, [cartItems, isMobile]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const updated = [...prev, item];
      if (!isMobile) {
        const cartJson = JSON.stringify(updated);
        sessionStorage.setItem('cart', cartJson);
        setCookie(CART_COOKIE_NAME, cartJson, 7);
      }
      return updated;
    });
  };

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    if (!isMobile) {
      const cartJson = JSON.stringify(updatedItems);
      sessionStorage.setItem('cart', cartJson);
      setCookie(CART_COOKIE_NAME, cartJson, 7);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    if (!isMobile) {
      sessionStorage.removeItem('cart');
      deleteCookie(CART_COOKIE_NAME);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, updateCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const CartContext = createContext();