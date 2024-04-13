import React, { createContext, useState } from 'react';

export const RegistrationContext = createContext({
  userData: {},
  setUserData: () => {},
  clearUserData: () => {}, // Define the clearUserData function
});

export const RegistrationProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  // Define the function to clear user data
  const clearUserData = () => {
    setUserData({});
  };

  return (
    <RegistrationContext.Provider value={{ userData, setUserData, clearUserData }}>
      {children}
    </RegistrationContext.Provider>
  );
};
