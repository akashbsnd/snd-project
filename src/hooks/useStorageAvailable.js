import { useState, useEffect } from 'react';

export function useStorageAvailable() {
  const [available, setAvailable] = useState(() => {
    try {
      const test = '__storage_test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    function checkStorage() {
      try {
        const test = '__storage_test__';
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        setAvailable(true);
      } catch (e) {
        setAvailable(false);
      }
    }

    window.addEventListener('storage', checkStorage);
    return () => window.removeEventListener('storage', checkStorage);
  }, []);

  return available;
}
