import { useEffect, useState } from 'react';

/* retourne value après n ms sans frappe (par défaut 400 ms) */
export const useDebounce = <T,>(value: T, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
};
