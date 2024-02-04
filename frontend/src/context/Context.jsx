import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState("");



  const toggleActive = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const logout = () => {
    setToken(null);
    setIsActive((prevIsActive) => !prevIsActive);
    localStorage.removeItem('token');
  };

  return (
    <AppContext.Provider value={{ isActive, toggleActive, token, 
    setToken, logout,showModal ,setShowModal, user, setUser }}>,  
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
