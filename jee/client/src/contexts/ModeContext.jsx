import { createContext,useState } from "react";

export const ModeContext=createContext();

export default function ModeContextProvider({children}) {
  const [darkMode, setDarkMode] = useState(true);
  const value={
    darkMode,
    setDarkMode,
  };

  return <ModeContext.Provider value={value}>
    {children}
  </ModeContext.Provider>
}