import { createContext, useEffect, useState } from 'react';
import { useStorageAvailable } from '../hooks/useStorageAvailable';

const CART_COOKIE_NAME = 'cart_backup';

function setCookie(name, value, days = 1) {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const expiresStr = expires.toUTCString();
    if (expiresStr === 'Invalid Date') {
      throw new Error('Invalid Date');
    }
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expiresStr};path=/;SameSite=Lax`;
  } catch (e) {
    const fallback = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${fallback.toString()};path=/;SameSite=Lax`;
  }
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
  const storageAvailable = useStorageAvailable();
  const canPersist = storageAvailable;

  const [cartItems, setCartItems] = useState(() => {
    if (!canPersist) {
      return [];
    }
    try {
      // Check localStorage first (more persistent across page reloads)
      const localItems = localStorage.getItem('cart');
      if (localItems) {
        return JSON.parse(localItems);
      }
      // Then check sessionStorage
      const sessionItems = sessionStorage.getItem('cart');
      if (sessionItems) {
        return JSON.parse(sessionItems);
      }
      // Then check cookies
      const cookieItems = getCookie(CART_COOKIE_NAME);
      if (cookieItems) {
        const parsed = JSON.parse(cookieItems);
        localStorage.setItem('cart', JSON.stringify(parsed));
        return parsed;
      }
      return [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    if (!canPersist) {
      return;
    }
    const cartJson = JSON.stringify(cartItems);
    sessionStorage.setItem('cart', cartJson);
    localStorage.setItem('cart', cartJson);
    setCookie(CART_COOKIE_NAME, cartJson, 7);
  }, [cartItems, canPersist]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const updated = [...prev, item];
      if (canPersist) {
        const cartJson = JSON.stringify(updated);
        sessionStorage.setItem('cart', cartJson);
        localStorage.setItem('cart', cartJson);
        setCookie(CART_COOKIE_NAME, cartJson, 7);
      }
      return updated;
    });
  };

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    if (canPersist) {
      const cartJson = JSON.stringify(updatedItems);
      sessionStorage.setItem('cart', cartJson);
      localStorage.setItem('cart', cartJson);
      setCookie(CART_COOKIE_NAME, cartJson, 7);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    if (canPersist) {
      sessionStorage.removeItem('cart');
      localStorage.removeItem('cart');
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