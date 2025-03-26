// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

// Creiamo il contesto del tema
const ThemeContext = createContext();

// Hook personalizzato per utilizzare il tema
export const useTheme = () => useContext(ThemeContext);

// Provider per condividere il tema in tutta l'applicazione
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Tema predefinito

  // Funzione per alternare il tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

