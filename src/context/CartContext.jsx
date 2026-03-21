import { createContext, useEffect, useState} from 'react';

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    try {
      const items = localStorage.getItem('cart');
      return items ? JSON.parse(items) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
export const CartContext = createContext();