// TimerContext.jsx
import React, { createContext, useState, useContext } from 'react';

const TimerContext = createContext();

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  return (
    <TimerContext.Provider value={{
      timeLeft,
      setTimeLeft,
      isTimeUp,
      setIsTimeUp
    }}>
      {children}
    </TimerContext.Provider>
  );
};
