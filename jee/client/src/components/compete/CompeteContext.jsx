import { createContext,useState } from "react";

export const CompeteContext=createContext();

export default function CompeteContextProvider({children}) {
  const [formmData, setFormmdata] = useState({
      questions:[],
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormmdata((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const value={
    formmData,
    setFormmdata,
    handleChange,
  };

  return <CompeteContext.Provider value={value}>
    {children}
  </CompeteContext.Provider>
}