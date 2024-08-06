import React, { createContext, useContext } from 'react';
import useWindowWidth from '../hooks/useWindowWidth';

// Create a Context for WindowWidth
const WindowWidthContext = createContext();

// Create a custom hook to use the WindowWidthContext
export const useWindowWidthContext = () => useContext(WindowWidthContext);

// Create a Provider Component
export const WindowWidthProvider = ({ children }) => {
  const windowWidth = useWindowWidth();

  return (
    <WindowWidthContext.Provider value={windowWidth}>
      {children}
    </WindowWidthContext.Provider>
  );
};
