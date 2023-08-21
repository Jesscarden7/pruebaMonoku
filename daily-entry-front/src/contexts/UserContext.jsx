import { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create the context provider component
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    token: null,
    userInfo: null,
    isLoggedin: false,
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
