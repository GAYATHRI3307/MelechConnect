import React, { createContext, useState, useContext } from 'react';

// Create a context to store users data
const UserContext = createContext();

// Create a custom hook to access the context easily
export const useUserContext = () => useContext(UserContext);

// Create a provider component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // Add user to the list of users
  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};
